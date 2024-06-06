import { Weapon, weaponProps } from '.';
import { getLocalisedText } from '../../../../translations';
import { CTX } from '../../../../types';
import { Character } from '../../characters';
import { modificationsList } from '../modifications/fabric';
import { materialsList } from '../modifications/models/materials';
import { axesList, axesModels } from './models/axes';
import { smgList, smgModels } from './models/beam';
import { blowPipeList, blowPipeModels } from './models/blowPipe';
import { bolasList, bolasModels } from './models/bolas';
import { bowList, bowModels } from './models/bow';
import { brawlingList, brawlingModels } from './models/brawling';
import { broadswordList, broadswordModels } from './models/broadsword';
import { crossbowList, crossbowModels } from './models/crossbow';
import { flailsList, flailsModels } from './models/flail';
import { garroteList, garroteModels } from './models/garrote';
import {
  grenadeLauncherList,
  grenadeLauncherModels,
} from './models/grenadeLauncher';
import { grenadesList, grenadesModels } from './models/grenades';
import { gunnerList, gunnerModels } from './models/gunner';
import { gyrocList, gyrocModels } from './models/gyroc';
import { knifeList, knifeModels } from './models/knife';
import { kusariList, kusariModels } from './models/kusari';
import { lanceList, lanceModels } from './models/lance';
import { lassoList, lassoModels } from './models/lasso';
import {
  liquidProjectorList,
  liquidProjectorModels,
} from './models/liquidProjector';
import { lmgList, lmgModels } from './models/lmg';
import { monowireWhipList, monowireWhipModels } from './models/monowireWhip';
import { netList, netModels } from './models/net';
import { pistolList, pistolModels } from './models/pistol';
import { polearmList, polearmModels } from './models/polearm';
import { forceSwordList, forceSwordModels } from './models/powerSword';
import { rapierList, rapierModels } from './models/rapier';
import { rifleList, rifleModels } from './models/rifle';
import { saberList, saberModels } from './models/saber';
import { smallswordList, smallswordModels } from './models/shortsword';
import { shotgunList, shotgunModels } from './models/shotgun';
import { slingList, slingModels } from './models/sling';
import { shortswordList, shortswordModels } from './models/smallsword';
import { beamList, beamModels } from './models/smg';
import { spearList, spearModels } from './models/spear';
import { staffList, staffModels } from './models/staff';
import {
  twoHandedAxeMaceList,
  twoHandedAxeMaceModels,
} from './models/twoHandedAxeMace';
import {
  twoHandedFlailList,
  twoHandedFlailModels,
} from './models/twoHandedFlail';
import {
  twoHandedSwordList,
  twoHandedSwordModels,
} from './models/twoHandedSword';
import { whipList, whipModels } from './models/whip';

export type weaponList =
  | axesList
  | brawlingList
  | broadswordList
  | flailsList
  | garroteList
  | knifeList
  | kusariList
  | lanceList
  | monowireWhipList
  | polearmList
  | forceSwordList
  | rapierList
  | saberList
  | shortswordList
  | smallswordList
  | spearList
  | staffList
  | twoHandedAxeMaceList
  | twoHandedSwordList
  | whipList
  | twoHandedFlailList
  | bolasList
  | bowList
  | lassoList
  | crossbowList
  | netList
  | slingList
  | pistolList
  | rifleList
  | shotgunList
  | smgList
  | lmgList
  | gunnerList
  | beamList
  | grenadeLauncherList
  | gyrocList
  | liquidProjectorList
  | grenadesList
  | blowPipeList;

export const WEAPON_LIST: Record<weaponList, createWeaponF> = {
  ...axesModels,
  ...brawlingModels,
  ...broadswordModels,
  ...flailsModels,
  ...garroteModels,
  ...knifeModels,
  ...kusariModels,
  ...lanceModels,
  ...monowireWhipModels,
  ...polearmModels,
  ...forceSwordModels,
  ...rapierModels,
  ...saberModels,
  ...shortswordModels,
  ...smallswordModels,
  ...spearModels,
  ...staffModels,
  ...twoHandedAxeMaceModels,
  ...twoHandedFlailModels,
  ...twoHandedSwordModels,
  ...whipModels,
  ...bolasModels,
  ...bowModels,
  ...crossbowModels,
  ...lassoModels,
  ...netModels,
  ...slingModels,
  ...grenadesModels,
  ...pistolModels,
  ...smgModels,
  ...lmgModels,
  ...liquidProjectorModels,
  ...gunnerModels,
  ...shotgunModels,
  ...rifleModels,
  ...grenadeLauncherModels,
  ...beamModels,
  ...gyrocModels,
  ...blowPipeModels,
};

export type weaponEffectResolver = (target: Character) => void;
export type weaponFabricType = Omit<weaponProps, 'name' | 'description'>;
export type createWeaponF = ({
  level,
  ctx,
  materialCode,
  modification,
}: {
  ctx: CTX;
  materialCode?: materialsList;
  level?: number;
  modification?: modificationsList[];
}) => Weapon;

export function weaponFabric(
  weaponSettings: weaponFabricType,
  resolver?: weaponEffectResolver
): createWeaponF {
  return ({ ctx, modification, materialCode }) => {
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
      resolver,
      ctx,
      materialCode,
      modification,
    });
  };
}
