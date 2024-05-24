import { Modification } from '.';
import { getLocalisedText } from '../../../../translations';
import { CTX } from '../../../../types';
import { Item } from '../item';
import { damageType } from '../weapon/damage';
import { materialModels, materialsList } from './models/materials';
import {
  weaponModificationList,
  weaponModificationModels,
} from './models/weapon';

export type optionalModifications = {
  breakChance?: number; // +/-
  weight?: number; // *
  throw?: {
    dmgMod?: number; // +/-
    aim?: number; // +/-
    damageType?: damageType[]; // бонусы применяются только для наборов матчащихся по типу урона
    newDamageType?: damageType; // заменяет
    armorDelimiter?: number; //??? пока заменяет
  };
  melee?: {
    dmgMod?: number; // +/-
    damageType?: damageType[]; // бонусы применяются только для наборов матчащихся по типу урона
    newDamageType?: damageType; // заменяет
    armorDelimiter?: number; //??? пока заменяет
  };
  ranged?: {
    range?: { maxRange?: number; halfRange?: number }; //перемножаем
    aim?: number; // +/-
    dmgMod?: number; // +/-
    damageType?: damageType[]; // бонусы применяются только для наборов матчащихся по типу урона
    newDamageType?: damageType; // заменяет
    armorDelimiter?: number; //??? пока заменяет
  };
};

export type baseModifications = {
  code: modificationsList;
  priceMultiplier: number; // +/-
};

export type modificationResolver = (
  item: Item
) => Partial<modificationSettings>;

export type modificationSettings = baseModifications &
  optionalModifications & {
    resolver?: modificationResolver;
  };

export type modificationsList = weaponModificationList | materialsList;

export const MODIFICATION_LIST: Record<modificationsList, createModificationF> =
  {
    ...weaponModificationModels,
    ...materialModels,
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
