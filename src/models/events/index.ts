import { CTX } from '../../types';
import { POST_ACTIONS_RESOLVERS } from '../characters/skills/resolvers/postActionResolvers';

import type { ActionPayload } from '../actionConnector';
import { EventAction } from '../tag/models/tag';
import { Condition } from '../tag/models/condition';
import { ObjectModel } from '../locations/object';
import { Item } from '../characters/inventory/item';
import { Character } from '../characters';
import { Location } from '../locations';
import { ResolveResult } from '../characters/skills';

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
    actor?: Character | Item | ObjectModel | Location;
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
        payload: { type: 'systemEvent' },
        target: ctx.gameData.getPlayerCharacter(),
      },
      effect,
      ctx
    );
  }
}
