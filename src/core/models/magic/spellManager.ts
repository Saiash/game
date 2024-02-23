import { CTX } from '../../../types';
import { Character } from '../characters';
import { SPELL_LIST, spellList } from './models';
import { Spell } from './spell';

export class SpellManager {
  collection: { [index: string]: Spell };
  character: Character;
  ctx: CTX;

  constructor({
    ctx,
    character,
    input,
  }: {
    ctx: CTX;
    character: Character;
    input?: any;
  }) {
    this.ctx = ctx;
    this.collection = {};
    this.character = character;
  }

  async add({
    name,
    exp = 0,
  }: {
    name: spellList;
    exp?: number;
  }): Promise<boolean> {
    if (this.collection[name]) return false;
    this.collection[name] = SPELL_LIST[name]({
      ctx: this.ctx,
      spellManager: this,
      exp,
    });
    return true;
  }

  getAsArray(): [string, Spell][] {
    return Object.entries(this.collection).map(i => {
      return [i[0], i[1]];
    });
  }

  getByCode(code: string) {
    return this.collection[code];
  }
}
