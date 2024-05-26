import { Bazooka } from './bazooka';
import { RocketGrenadeLauncher } from './rocketGrenadeLauncher';
import { RocketPropelledGrenade } from './rocketPropelledGrenade';

export type grenadeLauncherList =
  | 'bazooka'
  | 'rocketGrenadeLauncher'
  | 'rocketPropelledGrenade';

export const grenadeLauncherModels = {
  bazooka: Bazooka,
  rocketGrenadeLauncher: RocketGrenadeLauncher,
  rocketPropelledGrenade: RocketPropelledGrenade,
};
