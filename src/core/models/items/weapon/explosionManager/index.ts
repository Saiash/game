import { weaponManagerTypes } from '..';
import { CTX } from '../../../../../types';
import { Item } from '../../item';
import {
  BaseManager,
  baseDamageSet,
  baseWeaponManagerProps,
} from '../baseManager';
import { damageType } from '../damage';

export type explosionDamageSet = baseDamageSet & {
  dmgMod: number;
  damageType: damageType;
  armorDelimiter?: number;
};

export type explosionManagerProps = baseWeaponManagerProps & {
  fragmentDmg: number;
  damageSets: explosionDamageSet[];
};

export class ExplosionManager extends BaseManager {
  fragmentDmg: number;
  damageSets: explosionDamageSet[];
  type: weaponManagerTypes = 'explosion';

  constructor({
    ctx,
    props,
    item,
  }: {
    ctx: CTX;
    props: explosionManagerProps;
    item: Item;
  }) {
    super({ ctx, props, item });
    this.fragmentDmg = props.fragmentDmg;
    this.damageSets = props.damageSets;
  }

  getFragmentRange() {
    if (this.fragmentDmg === 0) return 0;
    return Math.floor(this.fragmentDmg / 4) * 5;
  }
}
