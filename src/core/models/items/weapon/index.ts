import { CTX } from '../../../../types';
import { Item, ItemProps } from '../item';
import { modificationsList } from '../modifications/fabric';
import { ExplosionManager, explosionManagerProps } from './explosionManager';
import { MeleeManager, meleeManagerProps } from './meleeManager';
import { RangedManager, rangedManagerProps } from './rangedManager';
import { ThrowManager, throwManagerProps } from './throwManager';

export type weaponProps = ItemProps & {
  twoHanded?: boolean;
  strRequired?: number;
  needToPrepareReachChange?: boolean;
  unreadyAfterAttack?: boolean;

  melee?: meleeManagerProps;
  ranged?: rangedManagerProps;
  explosion?: explosionManagerProps;
  throw?: throwManagerProps;
};

export type weaponManagerTypes = 'melee' | 'ranged' | 'explosion' | 'throw';
const manager = {
  melee: MeleeManager,
  ranged: RangedManager,
  explosion: ExplosionManager,
  throw: ThrowManager,
};

export type weaponManagers = {
  meleeManager?: MeleeManager;
  rangedManager?: RangedManager;
  explosionManager?: ExplosionManager;
  throwManager?: ThrowManager;
};

export class Weapon extends Item {
  managers: weaponManagers = {};
  twoHanded: boolean;
  unreadyAfterAttack: boolean;
  strRequired: number;

  constructor({
    ctx,
    props,
    modification = [],
  }: {
    ctx: CTX;
    props: weaponProps;
    modification?: modificationsList[];
  }) {
    super({ ctx, props, type: 'weapon', modification });
    const managers = this.managers;
    ['throw', 'melee', 'ranged', 'explosion'].forEach(managerKey => {
      const _key = managerKey as weaponManagerTypes;
      const prop = props[_key];
      if (!!prop) {
        // @ts-ignore
        managers[`${_key}Manager`] = new manager[_key]({
          ctx,
          // @ts-ignore
          props: { ...prop },
          item: this,
        });
      }
    });

    this.unreadyAfterAttack = props.unreadyAfterAttack || false; // неготово после атаки, но все ок, если сила в 1.5 раз больше
    this.strRequired = props.strRequired || 0;
    this.twoHanded = props.twoHanded || false;
  }

  oneHanded(str: number = 0) {
    //если оружие неготово после атаки - то надо х3 силы, что бы использовать его как одноруч
    return !this.twoHanded || str > this.getStrRequired() * 2;
  }

  getStrRequired() {
    return this.strRequired;
  }

  getManagerByType(code: weaponManagerTypes) {
    return this.managers[`${code}Manager`];
  }
}
