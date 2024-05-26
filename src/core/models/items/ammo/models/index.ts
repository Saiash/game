import { bullet05 } from './05';
import { bullet09 } from './09';
import { bullet10G } from './10G';
import { bullet12G } from './12G';
import { bullet15 } from './15';
import { bullet762 } from './762';
import { bullet8G } from './8G';
import { AaRocket } from './aaRocket';
import { Arrow } from './arrow';
import { AtgmRocket } from './atgmRocket';
import { Batteryl } from './batteryl';
import { Batterym } from './batterym';
import { Batterys } from './batterys';
import { Bolt } from './bolt';
import { Bullet } from './bullet';
import { Fuel } from './fuel';
import { Grenade } from './grenade';
import { Niddle } from './niddle';
import { Rocket } from './rocket';
import { RocketGrenade } from './rocketGrenade';
import { bullet045 } from './045';
import { bullet04 } from './04';
import { bullet041 } from './041';
import { bullet051 } from './051';
import { bullet038 } from './038';
import { bullet036 } from './036';
import { bullet044 } from './044';
import { bullet06 } from './06';
import { bullet057 } from './057';
import { bullet075 } from './075';
import { bullet4 } from './4';
import { bullet03 } from './03';
import { bullet0338 } from './0338';

export type ammoList =
  | 'niddle'
  | 'arrow'
  | 'bolt'
  | 'bullet'
  | 'batterys'
  | 'batterym'
  | 'grenade'
  | 'rocketGrenade'
  | 'rocket'
  | 'aaRocket'
  | 'atgmRocket'
  | 'fuel'
  | '7.62'
  | '5.56'
  | '0.3'
  | '0.338'
  | '0.5'
  | '0.57'
  | '0.4'
  | '0.38'
  | '0.36'
  | '0.41'
  | '0.44'
  | '0.45'
  | '0.51'
  | '0.6'
  | '0.75'
  | '0.9'
  | '4'
  | '1.5'
  | '8G'
  | '10G'
  | '12G'
  | 'batteryl';

export const AMMO_LIST = {
  niddle: Niddle,
  arrow: Arrow,
  bolt: Bolt,
  bullet: Bullet,
  grenade: Grenade,
  rocketGrenade: RocketGrenade,
  rocket: Rocket,
  aaRocket: AaRocket,
  atgmRocket: AtgmRocket,
  fuel: Fuel,
  '7.62': bullet762,
  '5.56': bullet762,
  '0.3': bullet03,
  '0.338': bullet0338,
  '0.5': bullet05,
  '0.57': bullet057,
  '0.38': bullet038,
  '0.36': bullet036,
  '0.4': bullet04,
  '4': bullet4,
  '0.41': bullet041,
  '0.44': bullet044,
  '0.45': bullet045,
  '0.51': bullet051,
  '0.6': bullet06,
  '0.75': bullet075,
  '0.9': bullet09,
  '1.5': bullet15,
  '8G': bullet8G,
  '10G': bullet10G,
  '12G': bullet12G,
  batterys: Batterys,
  batterym: Batterym,
  batteryl: Batteryl,
};
