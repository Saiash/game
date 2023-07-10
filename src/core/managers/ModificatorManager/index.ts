import { CTX } from '../../../types';
import { Tag } from '../tag/models/tag';

export class ModificatorManager {
  modList: {
    [index: number]: Tag;
  };
  summary: number;

  constructor() {
    this.modList = {};
    this.summary = 0;
  }

  addMod(mod: Tag): boolean {
    this.modList[mod.getId()] = mod;
    this.summary += mod.getValue();
    return true;
  }

  removeMod(mod: Tag): boolean {
    delete this.modList[mod.getId()];
    return true;
  }

  calculateSummary(): number {
    this.summary = 0;
    Object.values(this.modList).forEach(mod => {
      this.summary += mod.getValue();
    });
    return this.summary;
  }

  getAsArray(): [number, Tag][] {
    return Object.entries(this.modList).map(i => {
      return [parseInt(i[0]), i[1]];
    });
  }

  getValue(): number {
    return this.summary;
  }
}
