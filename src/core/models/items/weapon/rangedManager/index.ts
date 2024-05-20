import { weaponManagerTypes } from '..';
import { CTX } from '../../../../../types';
import { damageRoll } from '../../../characters/secondaryAttributes/models/damage';
import { skillList } from '../../../skills';
import { Item } from '../../item';
import {
  BaseManager,
  baseDamageSet,
  baseWeaponManagerProps,
} from '../baseManager';
import { calculateSwingVal, calculateThrustVal } from '../damage';
import { ammoClip } from './ammo';

export type rangeType = {
  maxRange: number;
  halfRange?: number;
  strBased: boolean;
};
export type rateOfFireTypes = 'fullauto' | 'semiauto' | 'shotgun' | 'stream';
export type rateOfFireType = {
  rof: number;
  shots: number;
  type: rateOfFireTypes;
};

export type rangedManagerProps = baseWeaponManagerProps & {
  relativeSkill: skillList;
  ammoClip: Omit<ammoClip, 'currentAmmo'>;
  reloadTime: number;
  bulk: number;
  recoil: number;
  aim: number;
  range: rangeType;
  rateOfFire: rateOfFireType;
  ownStr?: number;
  damageSets: baseDamageSet[];
  strBased?: boolean;
};

export class RangedManager extends BaseManager {
  ammoClip: ammoClip;

  reloadTime: number;
  bulk: number;
  recoil: number;

  aim: number;
  range: rangeType;
  rateOfFire: rateOfFireType;
  ownStr: number;
  damageSets: baseDamageSet[];
  relativeSkill: skillList;
  type: weaponManagerTypes = 'ranged';

  constructor({
    ctx,
    props,
    item,
  }: {
    ctx: CTX;
    props: rangedManagerProps;
    item: Item;
  }) {
    super({ ctx, props, item });

    this.ammoClip = { ...props.ammoClip, currentAmmo: 0 };
    this.damageSets = props.damageSets;

    this.bulk = props.bulk;
    this.reloadTime = props.reloadTime;
    this.recoil = props.recoil;

    this.aim = props.aim;
    this.range = props.range;
    this.rateOfFire = props.rateOfFire;
    this.ownStr = props.ownStr || 0;
    this.relativeSkill = props.relativeSkill;
  }

  getBulk() {
    return this.bulk;
  }

  getRecoil() {
    return this.recoil;
  }

  getRange(str?: number): rangeType {
    const _str = this.getOwnStr() ? this.getOwnStr() : str || 0;
    if (_str > 0) {
      return {
        maxRange: this.range.maxRange * _str,
        halfRange: this.range.halfRange || 0 * _str,
        strBased: this.range.strBased,
      };
    }
    return this.range;
  }

  getRateOfFire() {
    return this.rateOfFire;
  }

  getOwnStr() {
    return this.ownStr;
  }

  isStrBased() {
    return this.strBased || this.getOwnStr() > 0;
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
//TODO: fullauto - минимальная 1/4 от максимальной; дробь - MxN - где скорострельность M, струя - что-то особое
