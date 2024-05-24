import { Arrow } from './arrow';
import { Bolt } from './bolt';
import { Bullet } from './bullet';
import { Niddle } from './niddle';

export type ammoList = 'niddle' | 'arrow' | 'bolt' | 'bullet';

export const AMMO_LIST = {
  niddle: Niddle,
  arrow: Arrow,
  bolt: Bolt,
  bullet: Bullet,
};
