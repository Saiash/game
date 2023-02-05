import { conditions } from '../tag/models/condition';
import { EventAction } from '../tag/models/tag';

export type nodeId = string;

export type NodeArrow = {
  condition: conditions[];
  nextNodeId: nodeId;
};

export type DefaultData = {
  id: nodeId;
  type: 'scene' | 'node';
  arrows: NodeArrow[];
};

export class DefaultNode {
  private id: string;
  private arrows: NodeArrow[];

  constructor(data: DefaultData) {
    const { id, arrows } = data;
    this.id = id;
    this.arrows = arrows;
  }

  getId() {
    return this.id;
  }

  getArrows() {
    return this.arrows;
  }
}
