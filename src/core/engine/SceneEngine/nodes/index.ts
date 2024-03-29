import { conditions } from '../../../managers/tag/models/condition';

export type nodeId = string;

export type NodeArrow = {
  conditions: conditions[];
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
