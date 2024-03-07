import { Character } from '..';
import { CTX } from '../../../../types';
import { Weight } from './models/weight';
import { Damage } from './models/damage';
import { Dodge } from './models/dodge';
import { Reaction } from './models/reaction';
import { Size } from './models/size';
import { SecondaryAttribute } from './attribute';

export type SecondaryAttributesList = Weight | Damage | Dodge | Size | Reaction;

export type secondaryAttrsCodesList =
  | 'weight'
  | 'dmg'
  | 'dodge'
  | 'size'
  | 'reaction';

export const SECONDARY_ATTRS_LIST = [
  { code: 'weight', model: Weight },
  { code: 'dmg', model: Damage },
  { code: 'dodge', model: Dodge },
  { code: 'size', model: Size },
  { code: 'reaction', model: Reaction },
];

export class SecondaryAttributes {
  collection: { [index: string]: SecondaryAttributesList };
  ctx: CTX;

  constructor({ ctx, character }: { ctx: CTX; character: Character }) {
    this.ctx = ctx;
    this.collection = {};
    SECONDARY_ATTRS_LIST.forEach(attr => {
      this.collection[attr.code] = new attr.model({
        ctx,
        character,
      });
    });
  }

  getByCode<T = SecondaryAttribute>(code: secondaryAttrsCodesList): T {
    return this.collection[code] as unknown as T;
  }
}
