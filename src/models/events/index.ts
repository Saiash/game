import { CTX } from '../../types';
import { POST_ACTIONS_RESOLVERS } from '../characters/skills/resolvers/postActionResolvers';

import type { ActionPayload } from '../actionConnector';

export type EventAction = { type: string; effect: string[] | { id: string }[] };

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
    props: any;
    inputAction: ActionPayload;
  }) {
    this.ctx = ctx;
    this.id = id++;
    this.description = props.description;
    this.actions = props.actions;
    this.inputAction = inputAction;
  }

  static async createNewEvent(
    name: string,
    ctx: CTX,
    inputAction: ActionPayload
  ) {
    const eventData = await ctx.dataloaders.getEvent(name);
    return new Event({ ctx, props: eventData, inputAction });
  }

  async execute() {
    for (const action of this.actions) {
      const { type, effect } = action;
      await POST_ACTIONS_RESOLVERS[type](this.inputAction, effect, this.ctx);
    }
    return;
  }
}
