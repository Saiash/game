import { Apds } from './apds';
import { Aphc } from './aphc';
import { ArmorPiercing } from './armorPiercing';
import { HollowPoint } from './hollowPoint';

export type ammoModificationsList =
  | 'hollowPoint'
  | 'aphc'
  | 'armorPiercing'
  | 'apds';

export const ammoModificationsModels = {
  hollowPoint: HollowPoint,
  armorPiercing: ArmorPiercing,
  apds: Apds,
  aphc: Aphc,
};
