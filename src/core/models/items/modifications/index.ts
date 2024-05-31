import { CTX } from '../../../../types';
import { Item } from '../item';
import { modificationResolver, optionalModifications } from './fabric';

export class Modification {
  priceMultiplier: number;
  code: string;
  name: string;
  description: string;
  ctx: CTX;
  item: Item;
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
    this.item = item;
    this.ctx = ctx;
    this.optionalModifications = optionalModifications || {};

    if (resolver) {
      this.optionalModifications = resolver(item);
    }
  }

  getThrowAimMod(): number {
    return this.optionalModifications.throw?.aim || 0;
  }

  getWeightMod(): number {
    return this.optionalModifications.weight || 1;
  }

  getMalfunctionMod(): number {
    return this.optionalModifications.malfunction || 0;
  }

  getBreakChanceMod(): number {
    return this.optionalModifications.breakChance || 0;
  }

  getPriceMultiplierMod(): number {
    return this.priceMultiplier || 0;
  }

  getMeleeMod(): optionalModifications['melee'] {
    return this.optionalModifications.melee;
  }

  getThrowMod(): optionalModifications['throw'] {
    return this.optionalModifications.throw;
  }

  getRangedMod(): optionalModifications['ranged'] {
    return this.optionalModifications.ranged;
  }
}
