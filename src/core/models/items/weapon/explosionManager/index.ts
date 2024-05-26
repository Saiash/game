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
  fragmentDmg?: number;
  fuseTime: number;
  damageSets: explosionDamageSet[];
};

export class ExplosionManager extends BaseManager {
  fragmentDmg?: number;
  damageSets: explosionDamageSet[];
  fuseTime: number;
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
    this.fragmentDmg = props.fragmentDmg || 0;
    this.damageSets = props.damageSets;
    this.fuseTime = props.fuseTime;
  }

  getFragmentRange() {
    if (!this.fragmentDmg) return 0;
    if (this.fragmentDmg === 0) return 0;
    return Math.floor(this.fragmentDmg / 4) * 5;
  }
}
