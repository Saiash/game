import { result } from 'lodash';
import { CTX } from '../../../types';
import { Lore } from './lore';

export class LoreManager {
  private knownLore: { [index: string]: Lore };
  private ctx: CTX;

  constructor({
    ctx,
    knownLore,
  }: {
    ctx: CTX;
    knownLore?: { [index: string]: Lore };
  }) {
    this.ctx = ctx;
    this.knownLore = knownLore || {};
  }

  async add({
    dataloaders,
    name,
  }: {
    dataloaders: CTX['dataloaders'];
    name: string;
  }): Promise<boolean> {
    if (this.knownLore[name]) return false;
    const loreData = await dataloaders.getLore(name);

    this.knownLore[name] = new Lore({
      ctx: this.ctx,
      props: loreData,
    });
    return true;
  }

  getLoreByNames(names: string[]): Lore[] {
    const result = names
      .map(name => {
        return this.knownLore[name];
      })
      .filter(Boolean);
    return result;
  }
}
