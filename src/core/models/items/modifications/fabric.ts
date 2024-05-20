import { Modification } from '.';
import { getLocalisedText } from '../../../../translations';
import { CTX } from '../../../../types';
import { Item } from '../item';
import { damageType } from '../weapon/damage';
import {
  weaponModificationList,
  weaponModificationModels,
} from './models/weapon';

export type optionalModifications = {
  breakChance?: number;
  throw?: {
    aim?: number;
  };
  melee?: {
    dmgMod?: number;
    damageType?: damageType[];
  };
};

export type baseModifications = {
  code: modificationsList;
  priceMultiplier: number;
};

export type modificationResolver = (
  item: Item
) => Partial<modificationSettings>;

export type modificationSettings = baseModifications &
  optionalModifications & {
    resolver?: modificationResolver;
  };

export type modificationsList = weaponModificationList;

export const MODIFICATION_LIST: Record<modificationsList, createModificationF> =
  {
    ...weaponModificationModels,
  };

export type createModificationF = ({
  level,
  ctx,
  item,
}: {
  ctx: CTX;
  item: Item;
  level?: number;
}) => Modification;

export function modificationFabric(
  modificationSettings: modificationSettings
): createModificationF {
  return ({ ctx, item }) => {
    const { code, priceMultiplier, resolver, ...rest } = modificationSettings;
    const name = getLocalisedText(ctx.language, ['modification', code, 'name']);
    const description = getLocalisedText(ctx.language, [
      'modification',
      code,
      'description',
    ]);
    return new Modification({
      priceMultiplier,
      code,
      name,
      description,
      ctx,
      resolver,
      item,
      optionalModifications: {
        ...rest,
      },
    });
  };
}
