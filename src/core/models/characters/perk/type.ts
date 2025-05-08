import { Magery } from './advantagesModels/magery';
import { Curiosity } from './disadvantagesModels/curiosity';

export type perkList = 'magery';


export type disadvantageList = 'curiosity';

export const DISADVANTAGE_LIST: Record<disadvantageList, { code: disadvantageList, rawStruct: string }> =
{
  curiosity: Curiosity,
};

export const PERK_LIST: Record<perkList, { code: perkList, rawStruct: string }> = { magery: Magery };