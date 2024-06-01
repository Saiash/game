import { Modification } from '.';
import { getLocalisedText } from '../../../../translations';
import { CTX } from '../../../../types';
import { Item } from '../item';
import { damageType } from '../weapon/damage';
import { ammoModificationsList, ammoModificationsModels } from './models/ammo';
import { materialsList, materialTypes } from './models/materials';
import { meleeModificationList, meleeModificationModels } from './models/melee';
import {
  rangedModificationList,
  rangedModificationModels,
} from './models/ranged';
import {
  universalModificationList,
  universalModificationModels,
} from './models/universal';

export type optionalModifications = {
  breakChance?: number; // +/-
  weight?: number; // *
  malfunction?: number;
  throw?: {
    dmgMod?: number; // +/-
    aim?: number; // +/-
    damageType?: damageType[]; // бонусы применяются только для наборов матчащихся по типу урона
    newDamageType?: damageType; // заменяет
    armorDelimiter?: number; //??? пока заменяет
    options?: string[];
  };
  melee?: {
    dmgMod?: number; // +/-
    damageType?: damageType[]; // бонусы применяются только для наборов матчащихся по типу урона
    newDamageType?: damageType; // заменяет
    armorDelimiter?: number; //??? пока заменяет
    options?: string[];
  };
  ranged?: {
    range?: { maxRange?: number; halfRange?: number }; //перемножаем
    aim?: number; // +/-
    dmgMod?: number; // +/-
    damageType?: damageType[]; // бонусы применяются только для наборов матчащихся по типу урона
    newDamageType?: damageType; // заменяет
    armorDelimiter?: number; //??? пока заменяет
    options?: string[];
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

export type modificationsList =
  | meleeModificationList
  | ammoModificationsList
  | rangedModificationList
  | universalModificationList;

export const MODIFICATION_LIST: Record<modificationsList, createModificationF> =
  {
    ...meleeModificationModels,
    ...ammoModificationsModels,
    ...universalModificationModels,
    ...rangedModificationModels,
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

export type materialSettings = {
  tl: number;
  code: materialsList;
  priceMultiplier: number;
  type: materialTypes;
  DR?: number;
} & optionalModifications & {
    resolver?: modificationResolver;
  };

export function modificationFabric(
  modificationSettings: modificationSettings | materialSettings
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
