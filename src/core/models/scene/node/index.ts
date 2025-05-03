import { DefaultData, DefaultNode, NodeArrow, nodeId } from '..';
import { CTX } from '../../../../types';
import { Event } from '../../events';
import { Condition, conditions } from '../../../managers/tag/models/condition';
import { EventAction } from '../../../managers/tag/models/tag';
import { getLocalisedText } from '../../../../translations';
import { allNodes } from '../models';

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
  private text: string;

  constructor(id: DefaultData['id'], ctx: CTX) {
    const model = allNodes[id];
    super(id, ctx, model.arrows);
    this.text = getLocalisedText(ctx.language, ['node', id, 'text']);
  }

  async init(): Promise<void> {
    await this.ctx.gameData.log.addEvent({ text: this.text });
    // await this.executeContent();
    // await this.shareActions();
  }

  getText() {
    return this.text;
  }

  // async executeContent(): Promise<void> {
  //   for (const event of this.content) {
  //     await Event.execute({ data: event, ctx: this.ctx });
  //   }
  // }

  // async shareActions(): Promise<void> {
  //   this.ctx.gameData.log.clearActions();
  //   for (const action of this.actions) {
  //     const condition = new Condition({
  //       conditions: action.conditions || [],
  //       owner: this.ctx.gameData.getPlayerCharacter(),
  //       ctx: this.ctx,
  //     });
  //     if (!condition.checkConditions()) return;
  //     this.ctx.gameData.log.addAction({ text: action.description });
  //   }
  // }

  // async executeAction(index: number): Promise<void> {
  //   const action = this.actions[index];
  //   for (const event of action.resultingActions) {
  //     await Event.execute({ data: event, ctx: this.ctx });
  //   }
  // }
}
