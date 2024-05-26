import { AssaultRifle556 } from './assaultRifle556';
import { AssaultRifle762 } from './assaultRifle762';
import { Bombard } from './bombard';
import { CaseRifle } from './caseRifle';
import { DartGun } from './dartGun';
import { FlintlockMusket } from './flintlockMusket';
import { GaussRifle } from './gaussRifle';
import { LeverCarabiner } from './leverCarabiner';
import { Musket } from './musket';
import { Rifle } from './rifle';
import { SelfReloadingRifle } from './selfReloadingRifle';
import { SniperRifle } from './sniperRifle';

export type rifleList =
  | 'assaultRifle556'
  | 'assaultRifle762'
  | 'bombard'
  | 'dartGun'
  | 'flintlockMusket'
  | 'gaussRifle'
  | 'leverCarabiner'
  | 'musket'
  | 'rifle'
  | 'selfReloadingRifle'
  | 'sniperRifle'
  | 'caseRifle';

export const rifleModels = {
  assaultRifle556: AssaultRifle556,
  assaultRifle762: AssaultRifle762,
  bombard: Bombard,
  caseRifle: CaseRifle,
  dartGun: DartGun,
  gaussRifle: GaussRifle,
  leverCarabiner: LeverCarabiner,
  musket: Musket,
  rifle: Rifle,
  selfReloadingRifle: SelfReloadingRifle,
  sniperRifle: SniperRifle,
  flintlockMusket: FlintlockMusket,
};
