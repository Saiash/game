import { Ammo } from '.';
import { getLocalisedText } from '../../../../translations';
import { CTX } from '../../../../types';
import { ItemProps } from '../item';
import { modificationsList } from '../modifications/fabric';
import { baseDamageSet } from '../weapon/baseManager';

export type ammoFabricType = Omit<ItemProps, 'name' | 'description'>;
export type createAmmoF = ({
  level,
  ctx,
  modification,
}: {
  ctx: CTX;
  level?: number;
  modification?: modificationsList[];
}) => Ammo;

export function ammoFabric(ammoSettings: ammoFabricType): createAmmoF {
  return ({ ctx, modification }) => {
    const name = getLocalisedText(ctx.language, [
      'ammo',
      ammoSettings.code,
      'name',
    ]);
    const description = getLocalisedText(ctx.language, [
      'ammo',
      ammoSettings.code,
      'description',
    ]);
    return new Ammo({
      props: {
        ...ammoSettings,
        name,
        description,
      },
      ctx,
      modification,
    });
  };
}
