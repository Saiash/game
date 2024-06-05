import { Armor } from '.';
import { getLocalisedText } from '../../../../translations';
import { CTX } from '../../../../types';
import { modificationsList } from '../modifications/fabric';
import { materialsList } from '../modifications/models/materials';
import { armorTypesList, armorTypesModels } from './armorTypes';
import { armorSchemaList, armorSchemaModels } from './schemas';

export type createArmorSettings = {
  schema: armorSchemaList;
  armorType: armorTypesList;
};

export type createArmorF = ({
  ctx,
  modification,
  materialCode,
}: {
  ctx: CTX;
  modification?: modificationsList[];
  materialCode?: materialsList;
}) => Armor;

export const createArmorF = (props: createArmorSettings): createArmorF => {
  const code: armorList = `${props.armorType}${props.schema}` as any; // TODO!!
  return ({ ctx, modification, materialCode }) => {
    const name = getLocalisedText(ctx.language, ['armor', code, 'name']);
    const description = getLocalisedText(ctx.language, [
      'armor',
      code,
      'description',
    ]);
    return new Armor({
      props: {
        ...armorSchemaModels[props.schema],
        ...armorTypesModels[props.armorType],
        code: code,
        name,
        description,
        img: '',
      },
      ctx,
      materialCode,
      modification,
    });
  };
};

export type armorList =
  | 'layredClothLightbodyArmor'
  | 'clothordinary1hoodedDress';

export const ARMOR_LIST = {
  layredClothLightbodyArmor: createArmorF({
    armorType: 'layredClothLight',
    schema: 'bodyArmor',
  }),
  clothordinary1hoodedDress: createArmorF({
    armorType: 'clothordinary1',
    schema: 'hoodedDress',
  }),
};
