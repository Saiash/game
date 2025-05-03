import { battleZones } from '../../items/doll/types';
import { CheckResults } from '../skills/types';

export type defenceResult = {
  defenceRoll: CheckResults;
  damageTaken: damageTaken;
};

export type damageTaken = {
  zone: battleZones;
  damage: number;
  DR: number;
};
