import { CTX } from '../../../types';
import { Disadvantage } from './disadvantage';
import { Curious } from './models/curious';

export type disadvantageList = 'curious';

export type createDisadvantageF = ({
  level,
  ctx,
}: {
  ctx: CTX;
  level?: number;
}) => Disadvantage;

export const DISADVANTAGE_LIST: Record<disadvantageList, createDisadvantageF> =
  {
    curious: Curious,
  };
