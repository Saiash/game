import { armorType } from '..';

export const cane: armorType = {
  techLevel: 0,
  DR: 1,
  code: 'cane',
  armorType: 'rigit',
  materialTypes: ['fabric'],
  donningTime: 28,
  weight: 12,
  cost: 35,
};

//TODO: Загорается, если получает больше чем DR урона огнем
