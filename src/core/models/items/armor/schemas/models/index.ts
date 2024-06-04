import { ItemProps } from '../../../item';
import { armorTypesList } from '../../armorTypes/cloth';
import { bodyArmorSchema } from './bodyArmor';

export type armorSchema = {
  zones: ItemProps['zones'];
  code: armorSchemaList;
  matchingArmorTypes: armorTypesList[];
};

export type armorSchemaList = 'bodyArmor';
export const armorSchemaModels = { bodyArmor: bodyArmorSchema };
