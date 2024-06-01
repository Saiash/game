import { ItemProps } from '../../../item';
import { bodyArmorSchema } from './bodyArmor';

export type armorSchema = { zones: ItemProps['zones']; code: armorSchemaList };

export type armorSchemaList = 'bodyArmor';
export const armorSchemaModels = { bodyArmor: bodyArmorSchema };
