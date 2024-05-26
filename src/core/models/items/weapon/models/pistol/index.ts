import { Ap4 } from './ap4';
import { Ap45 } from './ap45';
import { Ap9 } from './ap9';
import { Derringer } from './derringer';
import { FlintlockPistol } from './flintlockPistol';
import { HiddenPistol } from './hiddenPistol';
import { Revolver36 } from './revolver36';
import { Revolver38 } from './revolver38';
import { Revolver44 } from './revolver44';
import { WheelLockPistol } from './wheelLockPistol';

export type pistolList =
  | 'ap4'
  | 'ap9'
  | 'ap45'
  | 'derringer'
  | 'hiddenPistol'
  | 'revolver36'
  | 'revolver38'
  | 'revolver44'
  | 'wheelLockPistol'
  | 'flintlockPistol';

export const pistolModels = {
  ap4: Ap4,
  ap9: Ap9,
  ap45: Ap45,
  derringer: Derringer,
  flintlockPistol: FlintlockPistol,
  revolver36: Revolver36,
  revolver38: Revolver38,
  revolver44: Revolver44,
  wheelLockPistol: WheelLockPistol,
  hiddenPistol: HiddenPistol,
};
