import { itemOptions, ItemProps } from '../../item';
import { armorTypesList } from '../armorTypes';
import { bodyArmorSchema } from './armor/bodyArmor';
import { coif } from './armor/coif';
import { cuirass } from './armor/cuirass';
import { elbowPad } from './armor/elbowPad';
import { gauntlet } from './armor/gauntlet';
import { gorget } from './armor/gorget';
import { greaves } from './armor/greaves';
import { helm } from './armor/helm';
import { jacket } from './armor/jacket';
import { kneePad } from './armor/kneePad';
import { mailCollar } from './armor/mailCollar';
import { openHelm } from './armor/openHelm';
import { pants } from './armor/pants';
import { sabaton } from './armor/sabaton';
import { shoulderPad } from './armor/shoulderPad';
import { skirt } from './armor/skirt';
import { sleeve } from './armor/sleeve';
import { thighGraves } from './armor/thighGraves';
import { vest } from './armor/vest';
import { clothSchemasModels, clothSchemasList } from './cloth';

export type armorSchema = {
  techLevel: number;
  zones: ItemProps['zones'];
  code: armorSchemaList;
  matchingArmorTypes: armorTypesList[];
  DR?: number;
  options?: itemOptions;
};

export type armorSchemaList =
  | 'bodyArmor'
  | clothSchemasList
  | 'coif'
  | 'vest'
  | 'sleeve'
  | 'skirt'
  | 'pants'
  | 'jacket'
  | 'helm'
  | 'sabaton'
  | 'greaves'
  | 'cuirass'
  | 'gorget'
  | 'gauntlet'
  | 'kneePad'
  | 'thighGraves'
  | 'elbowPad'
  | 'shoulderPad'
  | 'openHelm'
  | 'mailCollar';

export const armorSchemaModels = {
  bodyArmor: bodyArmorSchema,
  coif: coif,
  vest: vest,
  sleeve: sleeve,
  skirt: skirt,
  pants: pants,
  jacket: jacket,
  helm: helm,
  sabaton: sabaton,
  greaves: greaves,
  cuirass: cuirass,
  gorget: gorget,
  gauntlet: gauntlet,
  kneePad: kneePad,
  thighGraves: thighGraves,
  elbowPad: elbowPad,
  shoulderPad: shoulderPad,
  openHelm: openHelm,
  mailCollar: mailCollar,
  ...clothSchemasModels,
};
