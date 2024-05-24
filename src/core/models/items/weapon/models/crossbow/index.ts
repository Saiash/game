import { Crossbow } from './crossbow';
import { OneHandCrossbow } from './oneHandCrossbow';
import { Prodd } from './prodd';

export type crossbowList = 'crossbow' | 'oneHandCrossbow' | 'prodd';

export const crossbowModels = {
  crossbow: Crossbow,
  oneHandCrossbow: OneHandCrossbow,
  prodd: Prodd,
};
