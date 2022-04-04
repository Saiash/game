import { ModificatorManager } from '../../Modificator';
import { Attribute } from './attribute';
import { Dexterity } from './models/dexterity';
import { Fatigue } from './models/fatigue';
import { Health } from './models/health';
import { Hitpoints } from './models/hitpoints';
import { Inteligence } from './models/inteligence';
import { Move } from './models/move';
import { Perception } from './models/per';
import { Speed } from './models/speed';
import { Strength } from './models/strength';
import { Will } from './models/will';

export type AttributeProps = {
  name: string;
  code: string;
  rawValue: number;
  ModificatorManager: ModificatorManager;
  typePriority: number;
};

export type CheckResults = {
  rand: number;
  value: number;
  result: boolean;
};

const ATTRS_LIST = [
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

export class Attributes {
  collection: { [index: string]: Attribute };

  constructor(inputAttrs?: AttributeProps[]) {
    this.collection = {};
    ATTRS_LIST.forEach(attr => {
      const data = inputAttrs?.find(inputAttr => inputAttr.code === attr.code);
      this.collection[attr.code] = new attr.model(
        data || attr.model.getDefaultProps(),
        this
      );
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

  getByCode(code: string) {
    return this.collection[code];
  }
}
