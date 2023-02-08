import { DefaultData, DefaultNode, nodeId } from '.';
import { CTX } from '../../types';
import { EventAction } from '../tag/models/tag';

export type sceneId = string;

export type SceneData = DefaultData & {
  nodes: nodeId[];
  initialNode: nodeId;
};

export class Scene extends DefaultNode {
  private initialNode: nodeId;
  private ctx: CTX;

  constructor({ data, ctx }: { data: SceneData; ctx: CTX }) {
    const { initialNode } = data;
    super(data);
    this.initialNode = data.initialNode;
    this.ctx = ctx;
  }

  getInitialNodeId(): nodeId {
    return this.initialNode;
  }
}
