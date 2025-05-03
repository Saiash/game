import { CTX } from '../../../types';
import { nodeId } from '../../models/scene';
import { Node, NodeData } from '../../models/scene/node';
import { Condition } from '../../managers/tag/models/condition';

export type nodeHistory = {
  [index: nodeId]: { [index: number]: boolean };
};

export class SceneEngine {
  private ctx: CTX;
  private currentNode: Node | null;
  private lastNodeAction: number;

  constructor({ ctx }: { ctx: CTX }) {
    this.ctx = ctx;
    this.currentNode = null;
    this.lastNodeAction = -1;
  }

  async getNodeById(nodeId: nodeId): Promise<Node> {
    return new Node(nodeId, this.ctx);
  }

  async initNode(nodeId: string) {
    this.lastNodeAction = -1;
    this.currentNode = await this.getNodeById(nodeId);
    await this.currentNode.init();
  }

  getCurrentNode(): Node | null {
    return this.currentNode;
  }

  getLastAction(): number {
    return this.lastNodeAction;
  }

  async forwardByArrow(index: number) {
    if (!this.currentNode) throw new Error('no current node');
    const arrow = this.currentNode.getArrows()[index];
    if (!!arrow.onChooseEffect) {
      arrow.onChooseEffect(this.ctx);
    }
    await this.initNode(arrow.nextNodeId);
  }

  /*
    False -> нет подходящих стрелочек
    Null -> сцена закончилась
  */
  async getNextNode(): Promise<nodeId | false | null> {
    const arrows = this.currentNode?.getArrows();
    if (!arrows) throw new Error('No current node, SceneEngine -> getNextNode');
    if (arrows.length === 0) return null;
    for (const arrow of arrows) {
      const condition = new Condition({
        conditions: arrow.conditions || [],
        owner: this.ctx.gameData.getPlayerCharacter(),
        ctx: this.ctx,
      });
      if (condition.checkConditions()) return arrow.nextNodeId;
    }
    return false;
  }

  async executeAction(index: number): Promise<void> {
    const currentNode = this.currentNode;
    if (!currentNode)
      throw new Error('No current node, SceneEngine -> executeAction');
    //await currentNode.executeAction(index);
    const nextNode = await this.getNextNode();
    if (nextNode === null) {
      //TODO: вернуться на уровень выше к прошлой сцене
      return;
    }
    if (!nextNode) {
      throw new Error(
        'как может быть экшен без выхода?! SceneEngine -> executeAction'
      );
    }
    await this.initNode(nextNode);
  }
}
