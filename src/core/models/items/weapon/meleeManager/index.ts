import { weaponManagerTypes } from '..';
import { CTX } from '../../../../../types';
import { Item } from '../../item';
import {
  BaseManager,
  baseDamageSet,
  baseWeaponManagerProps,
} from '../baseManager';

export type parryOptions = 'fencing' | 'unbalanced' | 'unavailible';

export type meleeManagerProps = baseWeaponManagerProps & {
  parry: parryModel;
  needToPrepareReachChange?: boolean;

  damageSets: meleeDamageSet[];
};

export type attackTypesList = 'thrust' | 'swing';
export type parryModel = {
  bonus: number;
  options?: parryOptions;
};

export type meleeDamageSet = baseDamageSet & {
  reach: number[];
};

export class MeleeManager extends BaseManager {
  damageSets: meleeDamageSet[];
  parry: parryModel;
  ctx: CTX;
  needToPrepareReachChange: boolean;
  type: weaponManagerTypes = 'melee';

  constructor({
    ctx,
    props,
    item,
  }: {
    ctx: CTX;
    props: meleeManagerProps;
    item: Item;
  }) {
    super({ ctx, props, item });
    this.parry = props.parry;
    this.ctx = ctx;
    this.damageSets = props.damageSets;
    this.strBased = props.strBased || true;

    this.needToPrepareReachChange = props.needToPrepareReachChange || false;
  }

  getReach(setIndex?: number) {
    return this.getDamageSetByIndex(setIndex).reach;
  }

  getDamageSetByIndex(index?: number): meleeDamageSet {
    const set = this.damageSets[index || 0] || this.damageSets[0];
    return this.updateDamageSetByMods(set);
  }

  updateDamageSetByMods(set: meleeDamageSet): meleeDamageSet {
    this.item.modificationManager.mergeDamageSetWithMultipliers(set, 'melee');
    return set;
  }
}
