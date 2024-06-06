import { Modification } from '../..';
import { Bronze } from './bronze';
import { Cloth } from './cloth';
import { Iron } from './iron';
import { Leather } from './leather';
import { Obsidian } from './obsidian';
import { Plastic } from './plastic';
import { Silk } from './silk';
import { Silver } from './silver';
import { SpiderSilk } from './spiderSlik';
import { Steel } from './steel';
import { Stone } from './stone';
import { Wood } from './wood';

export type materialsList =
  | 'stone'
  | 'obsidian'
  | 'bronze'
  | 'iron'
  | 'steel'
  | 'silver'
  | 'silk'
  | 'spiderSilk'
  | 'cloth'
  | 'leather'
  | 'wood'
  | 'plastic';

export type materialTypes =
  | 'metal'
  | 'wood'
  | 'fabric'
  | 'composite'
  | 'leather'
  | 'bone'
  | 'stone';

export const materialModels = {
  stone: Stone,
  obsidian: Obsidian,
  bronze: Bronze,
  iron: Iron,
  steel: Steel,
  silver: Silver,
  silk: Silk,
  spiderSilk: SpiderSilk,
  cloth: Cloth,
  leather: Leather,
  wood: Wood,
  plastic: Plastic,
};

export class Material extends Modification {}
