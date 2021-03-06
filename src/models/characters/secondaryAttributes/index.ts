import { Character } from '..';
import { CTX } from '../../../types';
import { SecondaryAttribute } from './attribute';
import { Weight } from './models/weight';
import { Damage } from './models/damage';
import { Dodge } from './models/dodge';

export type SecondaryAttributesList = Weight | Damage | Dodge;

const ATTRS_LIST = [
  { code: 'weight', model: Weight },
  { code: 'dmg', model: Damage },
  { code: 'dodge', model: Dodge },
];

export class SecondaryAttributes {
  collection: { [index: string]: SecondaryAttributesList };
  ctx: CTX;

  constructor({ ctx, character }: { ctx: CTX; character: Character }) {
    this.ctx = ctx;
    this.collection = {};
    ATTRS_LIST.forEach(attr => {
      this.collection[attr.code] = new attr.model({
        ctx,
        character,
      });
    });
  }

  getByCode(code: string): SecondaryAttributesList {
    return this.collection[code];
  }
}
