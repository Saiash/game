import { CTX } from '../../../../types';
import { TagSystem } from '../../../managers/tag';

let perkId = 0;

export type rawPerkModel = {
  name: string;
  description: string;
  tags: string;
};

export class Perk {
  id: number;
  tags: TagSystem;
  name: string;
  description?: string;
  ctx: CTX;

  constructor({ ctx, data }: { ctx: CTX; data: rawPerkModel }) {
    this.id = perkId++;
    this.ctx = ctx;
    this.name = data.name;
    this.description = data.description;
    this.tags = new TagSystem({
      ctx,
      input: { props: data.tags },
      owner: this,
    });
  }

  hasStatus(value: string): boolean {
    return false;
  }

  addStatus(value: string): boolean {
    return false;
  }

  removeStatus(value: string): boolean {
    return false;
  }

  isLocked(): boolean {
    return this.hasStatus('locked');
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }
}
