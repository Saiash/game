import { WEAPON_LIST, createWeaponF, weaponList } from './weapon/fabric';

export type itemsList = weaponList;

export const ITEMS_LIST: Record<itemsList, createWeaponF> = { ...WEAPON_LIST };
