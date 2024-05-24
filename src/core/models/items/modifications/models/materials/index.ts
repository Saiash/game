import { Modification } from '../..';
import { Bronze } from './bronze';
import { Iron } from './iron';
import { Obsidian } from './obsidian';
import { Plastic } from './plastic';
import { Silver } from './silver';
import { Steel } from './steel';
import { Stone } from './stone';

export type materialsList =
  | 'stone'
  | 'obsidian'
  | 'bronze'
  | 'iron'
  | 'steel'
  | 'silver'
  | 'plastic';

export const materialModels = {
  stone: Stone,
  obsidian: Obsidian,
  bronze: Bronze,
  iron: Iron,
  steel: Steel,
  silver: Silver,
  plastic: Plastic,
};

export class Material extends Modification {}
