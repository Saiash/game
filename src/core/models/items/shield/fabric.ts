import { Shield, shieldProps } from '.';
import { getLocalisedText } from '../../../../translations';
import { CTX } from '../../../../types';
import { modificationsList } from '../modifications/fabric';
import { materialsList } from '../modifications/models/materials';
import {
  parryingBuckler,
  smallShieldLight,
  mediumShieldLight,
  largeShieldLight,
  homericBucklerMedium,
  mediumShieldHeavy,
  homericBucklerLarge,
  largeShieldHeavy,
  duelingBuckler,
  heaterShield,
  smallShieldHeavy,
  kiteShield,
  duelingLongShield,
} from './models';

export type shieldList =
  | 'parryingBuckler'
  | 'smallShieldLight'
  | 'largeShieldLight'
  | 'smallShieldHeavy'
  | 'homericBucklerMedium'
  | 'mediumShieldHeavy'
  | 'homericBucklerLarge'
  | 'largeShieldHeavy'
  | 'duelingBuckler'
  | 'heaterShield'
  | 'kiteShield'
  | 'duelingLongShield'
  | 'mediumShieldLight';

export const SHIELD_LIST: Record<shieldList, createShieldF> = {
  parryingBuckler,
  smallShieldLight,
  largeShieldLight,
  smallShieldHeavy,
  homericBucklerMedium,
  mediumShieldHeavy,
  homericBucklerLarge,
  largeShieldHeavy,
  duelingBuckler,
  heaterShield,
  kiteShield,
  duelingLongShield,
  mediumShieldLight,
};

export type shieldFabricType = Omit<shieldProps, 'name' | 'description'>;
export type createShieldF = ({
  level,
  ctx,
  materialCode,
  modification,
}: {
  ctx: CTX;
  materialCode?: materialsList;
  level?: number;
  modification?: modificationsList[];
}) => Shield;

export function shieldFabric(shieldSettings: shieldFabricType): createShieldF {
  return ({ ctx, modification, materialCode }) => {
    const name = getLocalisedText(ctx.language, [
      'shield',
      shieldSettings.code,
      'name',
    ]);
    const description = getLocalisedText(ctx.language, [
      'shield',
      shieldSettings.code,
      'description',
    ]);
    return new Shield({
      props: {
        ...shieldSettings,
        name,
        description,
      },
      ctx,
      materialCode,
      modification,
    });
  };
}
