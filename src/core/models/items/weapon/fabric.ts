import { Weapon, weaponProps } from '.';
import { getLocalisedText } from '../../../../translations';
import { CTX } from '../../../../types';
import { axesList, axesModels } from './models/axes';

export type weaponFabricType = Omit<weaponProps, 'name' | 'description'>;

export type weaponList = axesList;

export type createWeaponF = ({
  level,
  ctx,
}: {
  ctx: CTX;
  level?: number;
}) => Weapon;

export const WEAPON_LIST: Record<weaponList, createWeaponF> = { ...axesModels };

export function weaponFabric(weaponSettings: weaponFabricType): createWeaponF {
  return ({ ctx }) => {
    const name = getLocalisedText(ctx.language, [
      'weapon',
      weaponSettings.code,
      'name',
    ]);
    const description = getLocalisedText(ctx.language, [
      'weapon',
      weaponSettings.code,
      'description',
    ]);
    return new Weapon({
      props: {
        ...weaponSettings,
        name,
        description,
      },
      ctx,
    });
  };
}
