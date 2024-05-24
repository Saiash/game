import { BattleNet } from './battleNet';
import { BigNet } from './bigNet';

export type netList = 'bigNet' | 'battleNet';

export const netModels = {
  bigNet: BigNet,
  battleNet: BattleNet,
};
