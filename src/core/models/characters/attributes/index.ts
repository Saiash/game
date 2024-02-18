import { Character } from '..';
import { CTX } from '../../../../types';
import { ModificatorManager } from '../../../../core/managers/ModificatorManager';
import { CheckResults } from '../skills';
import { Attribute } from './attribute';
import { Dexterity } from './models/dexterity';
import { Fatigue } from './models/fatigue';
import { Health } from './models/health';
import { Hitpoints } from './models/hitpoints';
import { Inteligence } from './models/inteligence';
import { Move } from './models/move';
import { Perception } from './models/perception';
import { Speed } from './models/speed';
import { Strength } from './models/strength';
import { Will } from './models/will';

export type AttributeProps = {
  name: string;
  code: string;
  rawValue: number;
  modificatorManager: ModificatorManager;
  typePriority: number;
};

export const ATTRS_LIST = [
  { code: 'str', model: Strength },
  { code: 'dex', model: Dexterity },
  { code: 'ht', model: Health },
  { code: 'int', model: Inteligence },
  { code: 'hp', model: Hitpoints },
  { code: 'per', model: Perception },
  { code: 'will', model: Will },
  { code: 'speed', model: Speed },
  { code: 'move', model: Move },
  { code: 'ft', model: Fatigue },
];

export class AttributeManager {
  collection: { [index: string]: Attribute };
  character: Character;
  ctx: CTX;

  constructor({
    ctx,
    character,
    inputAttrs,
  }: {
    ctx: CTX;
    character: Character;
    inputAttrs?: AttributeProps[];
  }) {
    this.ctx = ctx;
    this.collection = {};
    this.character = character;
    ATTRS_LIST.forEach(attr => {
      const data = inputAttrs?.find(inputAttr => inputAttr.code === attr.code);
      const props = data || attr.model.getDefaultProps();
      this.collection[attr.code] = new attr.model({
        ctx,
        props,
        character,
        attributeManager: this,
      });
    });
  }

  check(key: string, difficulty: number): CheckResults {
    return this.collection[key].check(difficulty);
  }

  getAsArray(): [string, Attribute][] {
    return Object.entries(this.collection).map(i => {
      return [i[0], i[1]];
    });
  }

  getByCode(code: string): Attribute {
    return this.collection[code];
  }
}
