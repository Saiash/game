// export const clothTypes = [
//   { type: 'winter', cost: 0.3, weight: 5 },
//   { type: 'summer', cost: 0.1, weight: 1 },
//   { type: 'ordinary', cost: 0.2, weight: 2 },
// ];

import { armorType } from '..';

// const test = Object.keys(expensesByStatus).forEach(key => {
//   const _key = key as expensesList;
//   const cost = expensesByStatus[_key];
//   clothTypes.forEach(type => {
//     return {
//       techLevel: 0,
//       DR: 0,
//       code: `cloth${type.type}${_key}`,
//       armorType: 'flexible',
//       materialTypes: ['fabric'],
//       donningTime: 30,
//       weight: type.weight,
//       cost: type.cost * cost,
//     };
//   });
// });

export type clothTypesList =
  | 'clothordinary1'
  | 'clothordinary2'
  | 'clothordinary3'
  | 'clothordinary4'
  | 'clothordinary5'
  | 'clothordinary6'
  | 'clothordinary7'
  | 'clothordinary8'
  | 'clothordinary-2'
  | 'clothordinary-1'
  | 'clothordinary0'
  | 'clothsummer1'
  | 'clothsummer2'
  | 'clothsummer3'
  | 'clothsummer4'
  | 'clothsummer5'
  | 'clothsummer6'
  | 'clothsummer7'
  | 'clothsummer8'
  | 'clothsummer0'
  | 'clothsummer-2'
  | 'clothsummer-1'
  | 'clothwinter0'
  | 'clothwinter1'
  | 'clothwinter2'
  | 'clothwinter3'
  | 'clothwinter4'
  | 'clothwinter5'
  | 'clothwinter6'
  | 'clothwinter7'
  | 'clothwinter8'
  | 'clothwinter-2'
  | 'clothwinter-1';

export const clothesTypesModels: Record<clothTypesList, armorType> = {
  clothwinter0: {
    techLevel: 0,
    DR: 0,
    code: 'clothwinter0',
    armorType: 'flexible',
    materialTypes: ['fabric'],
    donningTime: 30,
    weight: 5,
    cost: 180,
  },
  clothsummer0: {
    techLevel: 0,
    DR: 0,
    code: 'clothsummer0',
    armorType: 'flexible',
    materialTypes: ['fabric'],
    donningTime: 30,
    weight: 1,
    cost: 60,
  },
  clothordinary0: {
    techLevel: 0,
    DR: 0,
    code: 'clothordinary0',
    armorType: 'flexible',
    materialTypes: ['fabric'],
    donningTime: 30,
    weight: 2,
    cost: 120,
  },
  clothwinter1: {
    techLevel: 0,
    DR: 0,
    code: 'clothwinter1',
    armorType: 'flexible',
    materialTypes: ['fabric'],
    donningTime: 30,
    weight: 5,
    cost: 360,
  },
  clothsummer1: {
    techLevel: 0,
    DR: 0,
    code: 'clothsummer1',
    armorType: 'flexible',
    materialTypes: ['fabric'],
    donningTime: 30,
    weight: 1,
    cost: 120,
  },
  clothordinary1: {
    techLevel: 0,
    DR: 0,
    code: 'clothordinary1',
    armorType: 'flexible',
    materialTypes: ['fabric'],
    donningTime: 30,
    weight: 2,
    cost: 240,
  },
  clothwinter2: {
    techLevel: 0,
    DR: 0,
    code: 'clothwinter2',
    armorType: 'flexible',
    materialTypes: ['fabric'],
    donningTime: 30,
    weight: 5,
    cost: 900,
  },
  clothsummer2: {
    techLevel: 0,
    DR: 0,
    code: 'clothsummer2',
    armorType: 'flexible',
    materialTypes: ['fabric'],
    donningTime: 30,
    weight: 1,
    cost: 300,
  },
  clothordinary2: {
    techLevel: 0,
    DR: 0,
    code: 'clothordinary2',
    armorType: 'flexible',
    materialTypes: ['fabric'],
    donningTime: 30,
    weight: 2,
    cost: 600,
  },
  clothwinter3: {
    techLevel: 0,
    DR: 0,
    code: 'clothwinter3',
    armorType: 'flexible',
    materialTypes: ['fabric'],
    donningTime: 30,
    weight: 5,
    cost: 3600,
  },
  clothsummer3: {
    techLevel: 0,
    DR: 0,
    code: 'clothsummer3',
    armorType: 'flexible',
    materialTypes: ['fabric'],
    donningTime: 30,
    weight: 1,
    cost: 1200,
  },
  clothordinary3: {
    techLevel: 0,
    DR: 0,
    code: 'clothordinary3',
    armorType: 'flexible',
    materialTypes: ['fabric'],
    donningTime: 30,
    weight: 2,
    cost: 2400,
  },
  clothwinter4: {
    techLevel: 0,
    DR: 0,
    code: 'clothwinter4',
    armorType: 'flexible',
    materialTypes: ['fabric'],
    donningTime: 30,
    weight: 5,
    cost: 18000,
  },
  clothsummer4: {
    techLevel: 0,
    DR: 0,
    code: 'clothsummer4',
    armorType: 'flexible',
    materialTypes: ['fabric'],
    donningTime: 30,
    weight: 1,
    cost: 6000,
  },
  clothordinary4: {
    techLevel: 0,
    DR: 0,
    code: 'clothordinary4',
    armorType: 'flexible',
    materialTypes: ['fabric'],
    donningTime: 30,
    weight: 2,
    cost: 12000,
  },
  clothwinter5: {
    techLevel: 0,
    DR: 0,
    code: 'clothwinter5',
    armorType: 'flexible',
    materialTypes: ['fabric'],
    donningTime: 30,
    weight: 5,
    cost: 180000,
  },
  clothsummer5: {
    techLevel: 0,
    DR: 0,
    code: 'clothsummer5',
    armorType: 'flexible',
    materialTypes: ['fabric'],
    donningTime: 30,
    weight: 1,
    cost: 60000,
  },
  clothordinary5: {
    techLevel: 0,
    DR: 0,
    code: 'clothordinary5',
    armorType: 'flexible',
    materialTypes: ['fabric'],
    donningTime: 30,
    weight: 2,
    cost: 120000,
  },
  clothwinter6: {
    techLevel: 0,
    DR: 0,
    code: 'clothwinter6',
    armorType: 'flexible',
    materialTypes: ['fabric'],
    donningTime: 30,
    weight: 5,
    cost: 1800000,
  },
  clothsummer6: {
    techLevel: 0,
    DR: 0,
    code: 'clothsummer6',
    armorType: 'flexible',
    materialTypes: ['fabric'],
    donningTime: 30,
    weight: 1,
    cost: 600000,
  },
  clothordinary6: {
    techLevel: 0,
    DR: 0,
    code: 'clothordinary6',
    armorType: 'flexible',
    materialTypes: ['fabric'],
    donningTime: 30,
    weight: 2,
    cost: 1200000,
  },
  clothwinter7: {
    techLevel: 0,
    DR: 0,
    code: 'clothwinter7',
    armorType: 'flexible',
    materialTypes: ['fabric'],
    donningTime: 30,
    weight: 5,
    cost: 18000000,
  },
  clothsummer7: {
    techLevel: 0,
    DR: 0,
    code: 'clothsummer7',
    armorType: 'flexible',
    materialTypes: ['fabric'],
    donningTime: 30,
    weight: 1,
    cost: 6000000,
  },
  clothordinary7: {
    techLevel: 0,
    DR: 0,
    code: 'clothordinary7',
    armorType: 'flexible',
    materialTypes: ['fabric'],
    donningTime: 30,
    weight: 2,
    cost: 12000000,
  },
  clothwinter8: {
    techLevel: 0,
    DR: 0,
    code: 'clothwinter8',
    armorType: 'flexible',
    materialTypes: ['fabric'],
    donningTime: 30,
    weight: 5,
    cost: 180000000,
  },
  clothsummer8: {
    techLevel: 0,
    DR: 0,
    code: 'clothsummer8',
    armorType: 'flexible',
    materialTypes: ['fabric'],
    donningTime: 30,
    weight: 1,
    cost: 60000000,
  },
  clothordinary8: {
    techLevel: 0,
    DR: 0,
    code: 'clothordinary8',
    armorType: 'flexible',
    materialTypes: ['fabric'],
    donningTime: 30,
    weight: 2,
    cost: 120000000,
  },
  'clothwinter-2': {
    techLevel: 0,
    DR: 0,
    code: 'clothwinter-2',
    armorType: 'flexible',
    materialTypes: ['fabric'],
    donningTime: 30,
    weight: 5,
    cost: 30,
  },
  'clothsummer-2': {
    techLevel: 0,
    DR: 0,
    code: 'clothsummer-2',
    armorType: 'flexible',
    materialTypes: ['fabric'],
    donningTime: 30,
    weight: 1,
    cost: 10,
  },
  'clothordinary-2': {
    techLevel: 0,
    DR: 0,
    code: 'clothordinary-2',
    armorType: 'flexible',
    materialTypes: ['fabric'],
    donningTime: 30,
    weight: 2,
    cost: 20,
  },
  'clothwinter-1': {
    techLevel: 0,
    DR: 0,
    code: 'clothwinter-1',
    armorType: 'flexible',
    materialTypes: ['fabric'],
    donningTime: 30,
    weight: 5,
    cost: 90,
  },
  'clothsummer-1': {
    techLevel: 0,
    DR: 0,
    code: 'clothsummer-1',
    armorType: 'flexible',
    materialTypes: ['fabric'],
    donningTime: 30,
    weight: 1,
    cost: 30,
  },
  'clothordinary-1': {
    techLevel: 0,
    DR: 0,
    code: 'clothordinary-1',
    armorType: 'flexible',
    materialTypes: ['fabric'],
    donningTime: 30,
    weight: 2,
    cost: 60,
  },
};
