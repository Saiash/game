import { weaponManagerTypes } from '..';
import { CTX } from '../../../../../types';
import { damageRoll } from '../../../characters/attributes/models/damage';
import { skillList } from '../../../characters/skills/models';
import { Item } from '../../item';
import {
  BaseManager,
  baseDamageSet,
  baseWeaponManagerProps,
} from '../baseManager';
import { calculateSwingVal, calculateThrustVal } from '../damage';
import { ammoClip, AmmoClip } from './ammoClip';

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
  ammoClip: AmmoClip;

  reloadTime: number;
  bulk: number;
  recoil: number;

  aim: number;
  range: rangeType;
  rateOfFire: rateOfFireType;
  ownStr: number;
  damageSets: baseDamageSet[];
  relativeSkill: skillList;
  malfunction: number;
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

    this.ammoClip = new AmmoClip(props.ammoClip);
    this.damageSets = props.damageSets;

    this.bulk = props.bulk;
    this.reloadTime = props.reloadTime;
    this.recoil = props.recoil;

    this.aim = props.aim;
    this.range = props.range;
    this.rateOfFire = props.rateOfFire;
    this.malfunction = 17;
    this.ownStr = props.ownStr || 0;
    this.relativeSkill = props.relativeSkill;
  }

  getBulk() {
    return this.bulk;
  }

  getRecoil() {
    return this.recoil;
  }

  getAim(): number {
    return (
      this.aim + (this.item.modificationManager.getRangedMultiplier().aim || 0)
    );
  }

  getMalfunction(): number {
    return (
      this.malfunction +
      this.item.modificationManager.getMalfunctionMultiplier()
    );
  }

  getRange(str?: number): rangeType {
    const _str = this.getOwnStr() ? this.getOwnStr() : str || 0;
    const modRange = this.item.modificationManager.getRangedMultiplier().range;
    const _range = {
      ...this.range,
      ...(this.range.halfRange
        ? { halfRange: this.range.halfRange * (modRange?.halfRange || 1) }
        : {}),
      ...{ maxRange: this.range.maxRange * (modRange?.maxRange || 1) },
    };

    if (_str > 0) {
      return {
        maxRange: _range.maxRange * _str,
        halfRange: _range.halfRange || 0 * _str,
        strBased: _range.strBased,
      };
    }
    return _range;
  }

  getRateOfFire() {
    return this.rateOfFire;
  }

  getOwnStr() {
    return this.ownStr;
  }

  getDamageSetByIndex(index?: number) {
    const set = this.damageSets[index || 0] || this.damageSets[0];
    return this.updateDamageSetByMods(this.updateDamageSetByAmmo(set));
  }

  updateDamageSetByAmmo(set: baseDamageSet): baseDamageSet {
    const ammo = this.ammoClip.getCurrentAmmo();
    ammo.modificationManager.mergeDamageSetWithMultipliers(set, 'ranged');
    return set;
  }

  updateDamageSetByMods(set: baseDamageSet): baseDamageSet {
    this.item.modificationManager.mergeDamageSetWithMultipliers(set, 'ranged');
    return set;
  }

  isStrBased() {
    return this.strBased || this.getOwnStr() > 0;
  }

  calculateThrustVal(maxStr: number): damageRoll {
    const itemStr = this.getOwnStr();
    if (itemStr === 0) return super.calculateThrustVal(maxStr);
    return calculateThrustVal(itemStr, maxStr, 0);
  }

  calculateSwingVal(maxStr: number): damageRoll {
    const itemStr = this.getOwnStr();
    if (itemStr === 0) return super.calculateSwingVal(maxStr);
    return calculateSwingVal(itemStr, maxStr, 0);
  }
}

/* TODO
«П» указывает на огнестрель- ное оружие, использующее муш- кетную подставку. Она включена в вес оружия. Требуется манёвр Подготовки, чтобы установить оружие на подставку - но после этого любой прицельный выстрел стоя считается произведенным с упора (см. Прицеливание, с.364).
«Сш» указывает на огнестрель- ное оружие с сошкой. Стрельба лежа с использованием сошки считается произведенной с упо- ра и уменьшает требования к СЛ до 2/3 от указанных (округлять вверх); т.е. СЛ 13, например, ста- новится СЛ 9.
Ст» означает, что оружие обычно монтируется на машине, станке или треноге. Игнорирует требования к СЛ. Монтаж или демонтаж занимает 3 секунды.
*/
//TODO: fullauto - минимальная 1/4 от максимальной; дробь - MxN - где скорострельность M, струя - что-то особое
