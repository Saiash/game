import { DefaultData, DefaultNode, NodeArrow, nodeId } from '.';
import { CTX } from '../../types';
import { Event } from '../events';
import { Condition, conditions } from '../tag/models/condition';
import { EventAction } from '../tag/models/tag';

export type NodeData = DefaultData & {
  content: EventAction[];
  actions: PlayerAction[];
};

export type PlayerAction = {
  conditions: conditions[];
  description: string;
  resultingActions: EventAction[];
};

export class Node extends DefaultNode {
  private ctx: CTX;
  private content: EventAction[];
  private actions: PlayerAction[];

  constructor({ data, ctx }: { data: NodeData; ctx: CTX }) {
    const { content, actions, id } = data;
    super(data);
    this.ctx = ctx;
    this.content = content;
    this.actions = actions;
  }

  async init(): Promise<void> {
    await this.executeContent();
    await this.shareActions();
  }

  async executeContent(): Promise<void> {
    for (const event of this.content) {
      await Event.execute({ data: event, ctx: this.ctx });
    }
  }

  async shareActions(): Promise<void> {
    this.ctx.gameData.log.clearActions();
    for (const action of this.actions) {
      const condition = new Condition({
        conditions: action.conditions || [],
        owner: this.ctx.gameData.getPlayerCharacter(),
        ctx: this.ctx,
      });
      if (!condition.checkConditions()) return;
      this.ctx.gameData.log.addAction({ text: action.description });
    }
  }

  async executeAction(index: number): Promise<void> {
    const action = this.actions[index];
    for (const event of action.resultingActions) {
      await Event.execute({ data: event, ctx: this.ctx });
    }
  }
}
