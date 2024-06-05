import { armorType } from '..';

export const wood: armorType = {
  techLevel: 0,
  DR: 3,
  code: 'wood',
  armorType: 'rigit',
  materialTypes: ['wood'],
  donningTime: 30,
  weight: 30,
  cost: 100,
};

//TODO: Semi-ablative. Loses 1 DR per 10 points of basic damage it resists (
