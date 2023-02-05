import { DefaultData, DefaultNode, nodeId } from '.';
import { EventAction } from '../tag/models/tag';

export type SceneData = DefaultData & {
  nodes: nodeId[];
};

export class Scene extends DefaultNode {
  constructor(data: SceneData) {
    const { id, arrows } = data;
    super(data);
  }
}
