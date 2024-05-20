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
    if (setIndex) {
      return this.calculateDamageMod(this.damageSets[setIndex].dmgMod);
    }
    return this.calculateDamageMod(this.damageSets[0].dmgMod);
  }

  getDamageType(setIndex?: number) {
    if (setIndex) {
      return this.damageSets[setIndex].damageType;
    }
    return this.damageSets[0].damageType;
  }

  getArmorDelimiter(setIndex?: number): number {
    if (setIndex) {
      return this.damageSets[setIndex].armorDelimiter || 1;
    }
    return this.damageSets[0].armorDelimiter || 1;
  }

  isStrBased() {
    return this.strBased;
  }
}
