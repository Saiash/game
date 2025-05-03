import { conditions } from '../../managers/tag/models/condition';
import { CTX } from '../../../types';

export type nodeId = string;

export type NodeArrow = {
  conditions: conditions[];
  nextNodeId: nodeId;
  onChooseEffect?: (ctx: CTX) => void;
};

export type DefaultData = {
  id: nodeId;
  type: 'junction' | 'node';
  arrows: NodeArrow[];
};

export class DefaultNode {
  private id: string;
  private arrows: NodeArrow[] = [];
  protected ctx: CTX;

  constructor(id: DefaultData['id'], ctx: CTX, arrows: NodeArrow[]) {
    this.id = id;
    this.arrows = arrows;
    this.ctx = ctx;
  }

  getId() {
    return this.id;
  }

  getArrows() {
    return this.arrows;
  }
}
