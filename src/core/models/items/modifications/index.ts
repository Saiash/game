import { CTX } from '../../../../types';
import { Item } from '../item';
import { modificationResolver, optionalModifications } from './fabric';

export class Modification {
  priceMultiplier: number;
  code: string;
  name: string;
  description: string;
  ctx: CTX;
  optionalModifications: optionalModifications;

  constructor({
    priceMultiplier,
    name,
    code,
    description,
    ctx,
    resolver,
    item,
    optionalModifications,
  }: {
    priceMultiplier: number;
    name: string;
    code: string;
    description: string;
    ctx: CTX;
    resolver?: modificationResolver;
    item: Item;
    optionalModifications?: optionalModifications;
  }) {
    this.priceMultiplier = priceMultiplier;
    this.code = code;
    this.name = name;
    this.description = description;
    this.ctx = ctx;
    this.optionalModifications = optionalModifications || {};

    if (resolver) {
      this.optionalModifications = resolver(item);
    }
  }

  getThrowAimMod(): number {
    return this.optionalModifications.throw?.aim || 0;
  }
}
