import { createAmmoF } from './ammo/fabric';
import { AMMO_LIST, ammoList } from './ammo/models';
import { ARMOR_LIST, armorList, createArmorF } from './armor/fabric';
import { SHIELD_LIST, shieldList } from './shield/fabric';
import { WEAPON_LIST, createWeaponF, weaponList } from './weapon/fabric';

export type itemsList = weaponList | ammoList | armorList | shieldList;

export type createItemF = createWeaponF | createAmmoF | createArmorF;

export const ITEMS_LIST: Record<itemsList, createItemF> = {
  ...WEAPON_LIST,
  ...AMMO_LIST,
  ...ARMOR_LIST,
  ...SHIELD_LIST,
};
