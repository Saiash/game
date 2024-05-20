import { Mace } from './mace';
import { Axe } from './axe';
import { Hatchet } from './hatchet';
import { Pickaxe } from './pickaxe';
import { SmallMace } from './smallMace';
import { ThrowingAxe } from './throwingAxe';

export type axesList =
  | 'axe'
  | 'hatchet'
  | 'throwingAxe'
  | 'mace'
  | 'smallMace'
  | 'pickaxe';

export const axesModels = {
  axe: Axe,
  hatchet: Hatchet,
  throwingAxe: ThrowingAxe,
  mace: Mace,
  smallMace: SmallMace,
  pickaxe: Pickaxe,
};
