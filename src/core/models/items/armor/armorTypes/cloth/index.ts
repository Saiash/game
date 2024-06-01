import { armorProps } from '../..';
import { ItemProps } from '../../../item';
import { materialTypes } from '../../../modifications/models/materials';
import { layredClothLight } from './layredClothLight';

export type armorType = Omit<
  ItemProps,
  'code' | 'name' | 'description' | 'img' | 'zones'
> & {
  DR: number;
  code: armorTypesList;
  materialTypes: materialTypes[];
  armorType: armorProps['armorType'];
  donningTime: number;
};

export type armorTypesList = 'layredClothLight';
export const armorTypesModels = { layredClothLight: layredClothLight };
