import { BigKnife } from './bigKnife';
import { Dagger } from './dagger';
import { SmallKnife } from './smallKnife';
import { WoodenStake } from './woodenStake';

export type knifeList = 'bigKnife' | 'smallKnife' | 'woodenStake' | 'dagger';

export const knifeModels = {
  bigKnife: BigKnife,
  smallKnife: SmallKnife,
  woodenStake: WoodenStake,
  dagger: Dagger,
};
