import { AssaultShotgun } from './assaultShotgun';
import { Blunderbuss } from './Blunderbuss';
import { DoubleBarreledShotgun } from './doubleBarreledShotgun';
import { PumpActionShotgun } from './pumpActionShotgun';

export type shotgunList =
  | 'assaultShotgun'
  | 'blunderbuss'
  | 'pumpActionShotgun'
  | 'doubleBarreledShotgun';

export const shotgunModels = {
  assaultShotgun: AssaultShotgun,
  blunderbuss: Blunderbuss,
  doubleBarreledShotgun: DoubleBarreledShotgun,
  pumpActionShotgun: PumpActionShotgun,
};
