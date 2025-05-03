import { CTX } from '../../../types';

import type { ActionPayload } from '../../engine/actionConnector';
import { EventAction } from '../../managers/tag/models/tag';
import { Condition } from '../../managers/tag/models/condition';
import { TagSystem } from '../../managers/tag';
import { ACTION_PAYLOAD_TYPE } from '../../engine/constants';
import { POST_ACTIONS_RESOLVERS } from '../skills/resolvers/postActionResolvers';
import { ResolveResult } from '../characters/skills/types';

export type rawEvent = { description: string; actions: EventAction[] };

let id = 0;

export class Event {
  private ctx: CTX;
  private id: number;
  private description: string;
  private actions: EventAction[];
  private inputAction: ActionPayload;

  constructor({
    ctx,
    props,
    inputAction,
  }: {
    ctx: CTX;
    props: rawEvent;
    inputAction: ActionPayload;
  }) {
    this.ctx = ctx;
    this.id = id++;
    this.description = props.description;
    this.actions = props.actions;
    this.inputAction = inputAction;
  }

  static async getEventById(
    name: string,
    ctx: CTX,
    inputAction: ActionPayload
  ) {
    const eventData = await ctx.dataloaders.getEvent(name);
    return new Event({ ctx, props: eventData, inputAction });
  }

  async execute(): Promise<ResolveResult[]> {
    const result = [];
    for (const action of this.actions) {
      const r = await Event.execute({ data: action, ctx: this.ctx });
      result.push(r);
    }
    return result;
  }

  static async execute({
    data,
    ctx,
    input,
    actor,
  }: {
    data: EventAction;
    ctx: CTX;
    input?: ActionPayload;
    actor?: TagSystem['owner'];
  }): Promise<ResolveResult> {
    const { type, effect, conditions, outerConditions } = data;
    const condition = new Condition({
      conditions: conditions || [],
      outerConditions: outerConditions,
      owner: actor || ctx.gameData.getPlayerCharacter(),
      ctx,
    });
    if (!condition.checkConditions()) return { executed: false };
    return await POST_ACTIONS_RESOLVERS[type](
      input || {
        payload: { type: ACTION_PAYLOAD_TYPE.SYSTEM_EVENT },
        sourceActor: ctx.gameData.getPlayerCharacter(),
        target: ctx.gameData.getPlayerCharacter(),
      },
      effect,
      ctx
    );
  }
}
