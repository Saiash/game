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
import { rangeType } from '../rangedManager';

export type throwManagerProps = baseWeaponManagerProps & {
  relativeSkill: skillList;
  bulk: number;
  aim: number;
  range: rangeType;
  damageSets: baseDamageSet[];
};

export class ThrowManager extends BaseManager {
  bulk: number;

  aim: number;
  range: rangeType;
  damageSets: baseDamageSet[];
  relativeSkill: skillList;
  type: weaponManagerTypes = 'throw';

  constructor({
    ctx,
    props,
    item,
  }: {
    ctx: CTX;
    props: throwManagerProps;
    item: Item;
  }) {
    super({ ctx, props, item });
    this.damageSets = props.damageSets;
    this.bulk = props.bulk;
    this.aim = props.aim;
    this.range = props.range;
    this.relativeSkill = props.relativeSkill;
  }

  getBulk() {
    return this.bulk;
  }

  getAim(): number {
    return (
      this.item.modifications.reduce(
        (result, mod) => result + mod.getThrowAimMod(),
        0
      ) + this.aim
    );
  }

  getRange(str?: number): rangeType {
    const _str = str || 0;
    if (_str > 0) {
      return {
        maxRange: this.range.maxRange * _str,
        halfRange: this.range.halfRange || 0 * _str,
        strBased: this.range.strBased,
      };
    }
    return this.range;
  }

  calculateThrustVal(maxStr: number): damageRoll {
    return calculateThrustVal(maxStr, maxStr, 0);
  }

  calculateSwingVal(maxStr: number): damageRoll {
    return calculateSwingVal(maxStr, maxStr, 0);
  }
}
