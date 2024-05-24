import { createAmmoF } from './ammo/fabric';
import { AMMO_LIST, ammoList } from './ammo/models';
import { WEAPON_LIST, createWeaponF, weaponList } from './weapon/fabric';

export type itemsList = weaponList | ammoList;

export type createItemF = createWeaponF | createAmmoF;

export const ITEMS_LIST: Record<itemsList, createItemF> = {
  ...WEAPON_LIST,
  ...AMMO_LIST,
};
