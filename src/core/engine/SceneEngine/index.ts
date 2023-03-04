import { CTX } from '../../../types';
import { nodeId } from './nodes';
import { Node, NodeData } from './nodes/node';
import { Scene, SceneData, sceneId } from './nodes/scene';
import { Condition } from '../../managers/tag/models/condition';

export type nodeHistory = {
  [index: nodeId]: { [index: number]: boolean };
};

export class SceneEngine {
  private ctx: CTX;
  private currentNode: Node | null;
  private currentScene: Scene | null;
  private currentScenes: sceneId[];
  private sceneHistory: { [index: sceneId]: nodeHistory };
  private lastNodeAction: number;

  constructor({ ctx }: { ctx: CTX }) {
    this.ctx = ctx;
    this.currentNode = null;
    this.currentScene = null;
    this.currentScenes = [];
    this.sceneHistory = {};
    this.lastNodeAction = -1;
  }

  async initScene(sceneId: sceneId): Promise<void> {
    this.currentScene = await this.getSceneById(sceneId);
    this.currentScenes.push(sceneId);
    await this.initNode(this.currentScene.getInitialNodeId());
  }

  async getSceneById(sceneId: sceneId): Promise<Scene> {
    const sceneData = (await this.ctx.dataloaders.getScene(
      sceneId
    )) as SceneData;
    return new Scene({ data: sceneData, ctx: this.ctx });
  }

  async getNodeById(nodeId: nodeId): Promise<Node> {
    const nodeData = (await this.ctx.dataloaders.getNode(nodeId)) as NodeData;
    return new Node({ data: nodeData, ctx: this.ctx });
  }

  async initNode(nodeId: string) {
    if (!this.currentScene) return;
    this.lastNodeAction = -1;
    this.currentNode = await this.getNodeById(nodeId);
    const currentSceneId = this.currentScene.getId();

    if (!this.sceneHistory[currentSceneId]) {
      this.sceneHistory[currentSceneId] = {};
    }
    this.sceneHistory[currentSceneId][nodeId] = {};

    await this.currentNode.init();
  }

  getCurrentNode(): Node | null {
    return this.currentNode;
  }

  getLastAction(): number {
    return this.lastNodeAction;
  }

  saveLastAction(index: number): void {
    this.lastNodeAction = index;
    const currentSceneId = this.currentScene?.getId() || '';
    const currentNodeId = this.currentNode?.getId() || '';
    this.sceneHistory[currentSceneId][currentNodeId][index] = true;
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
    await currentNode.executeAction(index);
    this.saveLastAction(index);
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
