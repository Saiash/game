import { CTX } from '../../../../types';
import { damageRoll } from '../../characters/secondaryAttributes/models/damage';
import { skillList } from '../../skills';
import { TwoHandedAxeMace } from '../../skills/models/twoHandedAxeMace';
import { Item, ItemProps } from '../item';
import { ammoType } from './ammo';
import { calculateSwingVal, calculateThrustVal, damageTypes } from './damage';

export type parryOptions = 'fencing' | 'unbalanced' | 'none' | null;
export type RoFType = 'fullauto' | 'semiauto' | 'shotgun' | 'stream';
//TODO: fullauto - минимальная 1/4 от максимальной; дробь - MxN - где скорострельность M, струя - что-то особое

export type weaponProps = ItemProps & {
  relativeSkill: skillList;
  twoHanded?: boolean;
  couldBeThrown?: boolean;
  dmgMod: number;
  strBased?: boolean;
  ammo?: [number, ammoType];
  fragmentDmg?: number;
  damageType: damageTypes;
  explosion?: boolean;
  armorDelimiter?: number;
  reach: number[];
  parry: [number, parryOptions];
  aim?: number;
  range?: [number, number | null, boolean];
  needToPrepareReachChange?: boolean;
  strRequired?: number;
  ownStr?: number;
  reloadTime?: number;
  bulk?: number;
  recoil?: number;
  rateOfFire?: [number, RoFType, number]; // скорострельность, тип, дробь
};

export class Weapon extends Item {
  twoHanded: boolean;
  relativeSkill: skillList;
  damageType: damageTypes;
  ammo: [number, number, ammoType]; // сколько сейчас, максимум, тип
  couldBeThrown: boolean;
  strBased: boolean;
  reloadTime: number;
  dmgMod: damageRoll;
  fragmentDmg: number;
  explosion: boolean;
  armorDelimiter: number;
  reach: number[];
  needToPrepareReachChange: boolean;
  parry: [number, parryOptions];
  aim: number;
  ownStr: number;
  strRequired: number;
  bulk: number;
  recoil: number;
  range: [number, number | null, boolean]; //максимальная дальность, половинная, основано на силе
  rateOfFire?: [number, RoFType, number];

  constructor({ ctx, props }: { ctx: CTX; props: weaponProps }) {
    super({ ctx, props });
    this.relativeSkill = props.relativeSkill;
    this.damageType = props.damageType;
    this.armorDelimiter = props.armorDelimiter || 1;
    this.reach = props.reach;
    this.parry = props.parry;
    this.aim = props.aim || 0;
    this.range = props.range || [0, 0, false];
    this.explosion = props.explosion || false;
    this.couldBeThrown = props.couldBeThrown || false;
    this.needToPrepareReachChange = props.needToPrepareReachChange || false;
    this.fragmentDmg = props.fragmentDmg || 0;
    this.strRequired = props.strRequired || 0;
    this.reloadTime = props.reloadTime || 0;
    this.ownStr = props.ownStr || 0;
    this.bulk = props.bulk || 0;
    this.recoil = props.recoil || 0;
    this.twoHanded = props.twoHanded || false;
    this.strBased = props.strBased || false;
    this.ammo = props.ammo ? [0, ...props.ammo] : [0, 0, 'none'];
    this.rateOfFire = props.rateOfFire || [1, 'semiauto', 1];
    this.dmgMod = this.calculateDamageMod(props.dmgMod);
  }

  oneHanded(str: number = 0) {
    return !this.twoHanded || str > this.getStrRequired() * 2;
  }

  getSkill() {
    return this.relativeSkill;
  }

  getBulk() {
    return this.bulk;
  }

  getRecoil() {
    return this.recoil;
  }

  isRanged() {
    return this.range[0] !== 0;
  }

  isStrBased() {
    return this.strBased || this.ownStr > 0;
  }

  getStrRequired() {
    return this.strRequired;
  }

  getRateOfFire() {
    return this.rateOfFire;
  }

  getOwnStr() {
    return this.ownStr;
  }

  getRange(str?: number): [number, number | null, boolean] {
    const _str = this.getOwnStr() ? this.getOwnStr() : str || 0;
    if (_str > 0) {
      return [this.range[0] * _str, this.range[1] || 0 * _str, this.range[2]];
    }
    return this.range;
  }

  getDamageMod() {
    return this.dmgMod;
  }

  getDamageType() {
    return this.damageType;
  }

  getArmorDelimiter() {
    return this.armorDelimiter;
  }

  getReach() {
    return this.reach;
  }

  getFragmentRange() {
    if (this.fragmentDmg === 0) return 0;
    return Math.floor(this.fragmentDmg / 4) * 5;
  }

  calculateDamageMod(rawDmg: number): damageRoll {
    return { dices: Math.floor(rawDmg / 4), mod: rawDmg % 4, raw: rawDmg };
  }

  calculateThrustVal(maxStr: number): damageRoll {
    const itemStr = this.getOwnStr();
    return calculateThrustVal(itemStr, maxStr, 0);
  }

  calculateSwingVal(maxStr: number): damageRoll {
    const itemStr = this.getOwnStr();
    return calculateSwingVal(itemStr, maxStr, 0);
  }
}

/*
«П» указывает на огнестрель- ное оружие, использующее муш- кетную подставку. Она включена в вес оружия. Требуется манёвр Подготовки, чтобы установить оружие на подставку - но после этого любой прицельный выстрел стоя считается произведенным с упора (см. Прицеливание, с.364).
«Сш» указывает на огнестрель- ное оружие с сошкой. Стрельба лежа с использованием сошки считается произведенной с упо- ра и уменьшает требования к СЛ до 2/3 от указанных (округлять вверх); т.е. СЛ 13, например, ста- новится СЛ 9.
Ст» означает, что оружие обычно монтируется на машине, станке или треноге. Игнорирует требования к СЛ. Монтаж или демонтаж занимает 3 секунды.
*/
