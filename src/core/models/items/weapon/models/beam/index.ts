import { ElectrolaserPistol } from './electrolaserPistol';
import { ElectrolaserRifle } from './electrolaserRifle';
import { HeavyPlasmaRifle } from './heavyPlasmaRifle';
import { LaserPistol } from './laserPistol';
import { LaserRifle } from './laserRifle';
import { LaserSniperRifle } from './laserSniperRifle';
import { PlasmaPistol } from './plasmaPistol';
import { PlasmaRifle } from './plasmaRifle';

export type smgList =
  | 'electrolaserPistol'
  | 'electrolaserRifle'
  | 'laserPistol'
  | 'laserRifle'
  | 'laserSniperRifle'
  | 'plasmaPistol'
  | 'plasmaRifle'
  | 'heavyPlasmaRifle';

export const smgModels = {
  electrolaserPistol: ElectrolaserPistol,
  electrolaserRifle: ElectrolaserRifle,
  laserPistol: LaserPistol,
  laserRifle: LaserRifle,
  laserSniperRifle: LaserSniperRifle,
  plasmaPistol: PlasmaPistol,
  plasmaRifle: PlasmaRifle,
  heavyPlasmaRifle: HeavyPlasmaRifle,
};
