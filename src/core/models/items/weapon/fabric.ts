import { Weapon, weaponProps } from '.';
import { getLocalisedText } from '../../../../translations';
import { CTX } from '../../../../types';
import { Character } from '../../characters';
import { modificationsList } from '../modifications/fabric';
import { axesList, axesModels } from './models/axes';
import { blowPipeList, blowPipeModels } from './models/blowPipe';
import { bolasList, bolasModels } from './models/bolas';
import { bowList, bowModels } from './models/bow';
import { brawlingList, brawlingModels } from './models/brawling';
import { broadswordList, broadswordModels } from './models/broadsword';
import { crossbowList, crossbowModels } from './models/crossbow';
import { flailsList, flailsModels } from './models/flail';
import { garroteList, garroteModels } from './models/garrote';
import { knifeList, knifeModels } from './models/knife';
import { kusariList, kusariModels } from './models/kusari';
import { lanceList, lanceModels } from './models/lance';
import { lassoList, lassoModels } from './models/lasso';
import { monowireWhipList, monowireWhipModels } from './models/monowireWhip';
import { netList, netModels } from './models/net';
import { polearmList, polearmModels } from './models/polearm';
import { forceSwordList, forceSwordModels } from './models/powerSword';
import { rapierList, rapierModels } from './models/rapier';
import { saberList, saberModels } from './models/saber';
import { shieldList, shieldModels } from './models/shield';
import { smallswordList, smallswordModels } from './models/shortsword';
import { slingList, slingModels } from './models/sling';
import { shortswordList, shortswordModels } from './models/smallsword';
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
  | shieldList
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
  ...shieldModels,
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
  ...blowPipeModels,
};

export type weaponEffectResolver = (target: Character) => void;
export type weaponFabricType = Omit<weaponProps, 'name' | 'description'>;
export type createWeaponF = ({
  level,
  ctx,
  modification,
}: {
  ctx: CTX;
  level?: number;
  modification?: modificationsList[];
}) => Weapon;

export function weaponFabric(
  weaponSettings: weaponFabricType,
  resolver?: weaponEffectResolver
): createWeaponF {
  return ({ ctx, modification }) => {
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
      modification,
    });
  };
}
