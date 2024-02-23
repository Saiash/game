import { CTX } from '../../../types';
import { Perk } from './perk';
import { Magery } from './models/magery';

export type perkList = 'magery';

export type createPerkF = ({
  level,
  ctx,
}: {
  ctx: CTX;
  level?: number;
}) => Perk;

export const PERK_LIST: Record<perkList, createPerkF> = { magery: Magery };
