import { DefaultData, DefaultNode, NodeArrow, nodeId } from '.';
import { conditions } from '../tag/models/condition';
import { EventAction } from '../tag/models/tag';

export type NodeData = DefaultData & {
  content: EventAction[];
  actions: PlayerAction[];
};

export type PlayerAction = {
  condition: conditions[];
  description: string;
  resultingAction: EventAction[];
};

export class Node extends DefaultNode {
  constructor(data: NodeData) {
    const { id, arrows } = data;
    super(data);
  }
}
