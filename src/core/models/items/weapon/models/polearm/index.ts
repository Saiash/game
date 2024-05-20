import { Glaive } from './glaive';
import { Halberd } from './halberd';
import { Naginata } from './naginata';
import { Poleaxe } from './poleaxe';

export type polearmList = 'glaive' | 'naginata' | 'halberd' | 'poleaxe';

export const polearmModels = {
  glaive: Glaive,
  naginata: Naginata,
  halberd: Halberd,
  poleaxe: Poleaxe,
};
