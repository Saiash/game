import { itemOptions, ItemProps } from '../../item';
import { armorTypesList } from '../armorTypes';
import { bodyArmorSchema } from './armor/bodyArmor';
import { clothSchemasModels, clothSchemasList } from './cloth';

export type armorSchema = {
  techLevel: number;
  zones: ItemProps['zones'];
  code: armorSchemaList;
  matchingArmorTypes: armorTypesList[];
  DR?: number;
  options?: itemOptions;
};

export type armorSchemaList = 'bodyArmor' | clothSchemasList;
export const armorSchemaModels = {
  bodyArmor: bodyArmorSchema,
  ...clothSchemasModels,
};
