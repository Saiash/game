import { Magery } from './advantagesModels/magery';
import { Curious } from './disadvantagesModels/curious';

export type perkList = 'magery';


export type disadvantageList = 'curious';

export const DISADVANTAGE_LIST: Record<disadvantageList, { code: disadvantageList, rawStruct: string }> =
{
  curious: Curious,
};

export const PERK_LIST: Record<perkList, { code: perkList, rawStruct: string }> = { magery: Magery };
