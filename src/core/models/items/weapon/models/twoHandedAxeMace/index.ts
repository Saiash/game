import { CircularSaw } from './circularSaw';
import { Maul } from './maul';
import { Scyte } from './scyte';
import { Tooth } from './tooth';
import { TwoHandedAxe } from './twoHandedAxe';

export type twoHandedAxeMaceList =
  | 'circularSaw'
  | 'scyte'
  | 'maul'
  | 'tooth'
  | 'twoHandedAxe';

export const twoHandedAxeMaceModels = {
  circularSaw: CircularSaw,
  scyte: Scyte,
  maul: Maul,
  tooth: Tooth,
  twoHandedAxe: TwoHandedAxe,
};
