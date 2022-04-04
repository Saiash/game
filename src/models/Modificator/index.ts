export type Mod = {
  source: string;
  value: number;
  duration: number;
};

export class ModificatorManager {
  modList: {
    [index: number]: Mod;
  };
  summary: number;

  constructor() {
    this.modList = {};
    this.summary = 0;
  }

  getFirstFreeSlot() {
    let index = 0;
    let freeSlot = false;
    while (index < 1000 && !freeSlot) {
      if (!this.modList[index]) {
        freeSlot = true;
      } else {
        index++;
      }
    }
    return index;
  }

  addMod(mod: Mod): boolean {
    this.modList[this.getFirstFreeSlot()] = mod;
    this.summary += mod.value;
    return true;
  }

  removeMod(index: number): boolean {
    const mod = this.modList[index];
    if (mod) {
      this.summary -= mod.value;
      delete this.modList[index];
      return true;
    }
    return false;
  }

  calculateSummary(): number {
    this.summary = 0;
    Object.values(this.modList).forEach(mod => {
      this.summary += mod.value;
    });
    return this.summary;
  }

  getAsArray(): [number, Mod][] {
    return Object.entries(this.modList).map(i => {
      return [parseInt(i[0]), i[1]];
    });
  }

  getValue(): number {
    return this.summary;
  }
}
