import { weaponManagerTypes } from '.';
import { CTX } from '../../../../types';
import { damageRoll } from '../../characters/secondaryAttributes/models/damage';
import { skillList } from '../../skills';
import { Item } from '../item';
import { damageType } from './damage';
import { attackTypesList } from './meleeManager';

export type baseWeaponManagerProps = {
  relativeSkill: skillList;
  damageSets: baseDamageSet[];
  strBased?: boolean;
};

export type baseDamageSet = {
  dmgMod: number;
  damageType: damageType;
  armorDelimiter?: number;
  attackType: attackTypesList;
  options?: damageSetOptions;
};

export type damageSetOptions = {
  parry?: number;
  block?: number;
};

export class BaseManager {
  relativeSkill: skillList;
  damageSets: baseDamageSet[];
  strBased: boolean;
  type: string = 'base';
  ctx: CTX;
  item: Item;

  constructor({
    ctx,
    props,
    item,
  }: {
    ctx: CTX;
    props: baseWeaponManagerProps;
    item: Item;
  }) {
    this.ctx = ctx;
    this.relativeSkill = props.relativeSkill;
    this.damageSets = props.damageSets;
    this.strBased = props.strBased || false;
    this.item = item;
  }

  getSkill() {
    return this.relativeSkill;
  }

  calculateDamageMod(rawDmg: number): damageRoll {
    return { dices: Math.floor(rawDmg / 4), mod: rawDmg % 4, raw: rawDmg };
  }

  getDamageMod(setIndex?: number) {
    return this.calculateDamageMod(this.getDamageSetByIndex(setIndex).dmgMod);
  }

  getDamageType(setIndex?: number) {
    return this.getDamageSetByIndex(setIndex).damageType;
  }

  getDamageSetByIndex(index?: number): baseDamageSet {
    return this.damageSets[index || 0] || this.damageSets[0];
  }

  getArmorDelimiter(setIndex?: number): number {
    return this.getDamageSetByIndex(setIndex).armorDelimiter || 1;
  }

  isStrBased() {
    return this.strBased;
  }
}
