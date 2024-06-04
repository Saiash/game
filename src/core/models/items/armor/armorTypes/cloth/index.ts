import { weekdays } from 'moment';
import { armorProps } from '../..';
import { ItemProps } from '../../../item';
import { materialTypes } from '../../../modifications/models/materials';
import { brigandineHeavy } from './brigandineHeavy';
import { brigandineLight } from './brigandineLight';
import { brigandineMedium } from './brigandineMedium';
import { cane } from './cane';
import { hardenedLeatherHeavy } from './hardenedLeatherHeavy';
import { hardenedLeatherMedium } from './hardenedLeatherMedium';
import { horn } from './horn';
import { jackOfPlates } from './jackOfPlates';
import { layeredClothHeavy } from './layeredClothHeavy';
import { layredClothLight } from './layeredClothLight';
import { layeredClothMedium } from './layeredClothMedium';
import { layeredLeatherHeavy } from './layeredLeatherHeavy';
import { layeredLeatherLight } from './layeredLeatherLight';
import { layeredLeatherMedium } from './layeredLeatherMedium';
import { leatherHeavy } from './leatherHeavy';
import { leatherMedium } from './leatherMedium';
import { mailAndPlates } from './mailAndPlates';
import { mailFine } from './mailFine';
import { mailLight } from './mailLight';
import { paddedCloth } from './paddedCloth';
import { scaleLight } from './scaleLight';
import { Game } from '../../../../../../components/game';
import { scaleMedium } from './scaleMedium';
import { scaleHeavy } from './scaleHeavy';
import { mailHeavy } from './mailHeavy';
import { segmentedPlateLight } from './segmentedPlateLight';
import { segmentedPlateMedium } from './segmentedPlateMedium';
import { segmentedPlateHeavy } from './segmentedPlateHeavy';
import { mailJousting } from './mailJousting';
import { papperProofed } from './papperProofed';
import { plateLight } from './plateLight';
import { plateMedium } from './plateMedium';
import { plateHeavy } from './plateHeavy';
import { straw } from './straw';
import { wood } from './wood';

export type armorType = Omit<
  ItemProps,
  'code' | 'name' | 'description' | 'img' | 'zones'
> & {
  DR: number;
  code: armorTypesList;
  materialTypes: materialTypes[];
  armorType: armorProps['armorType'];
  donningTime: number;
};

export type armorTypesList =
  | 'layredClothLight'
  | 'cane'
  | 'paddedCloth'
  | 'hardenedLeatherMedium'
  | 'hardenedLeatherHeavy'
  | 'brigandineMedium'
  | 'brigandineHeavy'
  | 'horn'
  | 'mailFine'
  | 'straw'
  | 'layeredLeatherHeavy'
  | 'layeredLeatherMedium'
  | 'layeredClothHeavy'
  | 'jackOfPlates'
  | 'leatherHeavy'
  | 'leatherMedium'
  | 'mailAndPlates'
  | 'scaleLight'
  | 'scaleMedium'
  | 'scaleHeavy'
  | 'mailLight'
  | 'mailHeavy'
  | 'segmentedPlateLight'
  | 'segmentedPlateHeavy'
  | 'layeredClothMedium'
  | 'segmentedPlateMedium'
  | 'papperProofed'
  | 'layeredLeatherLight'
  | 'mailJousting'
  | 'plateLight'
  | 'plateMedium'
  | 'wood'
  | 'plateHeavy'
  | 'brigandineLight';

export const armorTypesModels = {
  layredClothLight: layredClothLight,
  cane: cane,
  horn: horn,
  straw: straw,
  paddedCloth: paddedCloth,
  layeredClothHeavy: layeredClothHeavy,
  layeredLeatherHeavy: layeredLeatherHeavy,
  leatherHeavy: leatherHeavy,
  leatherMedium: leatherMedium,
  plateLight: plateLight,
  mailAndPlates: mailAndPlates,
  mailFine: mailFine,
  papperProofed: papperProofed,
  plateMedium: plateMedium,
  mailLight: mailLight,
  mailHeavy: mailHeavy,
  wood: wood,
  plateHeavy: plateHeavy,
  scaleLight: scaleLight,
  mailJousting: mailJousting,
  scaleMedium: scaleMedium,
  segmentedPlateHeavy: segmentedPlateHeavy,
  scaleHeavy: scaleHeavy,
  segmentedPlateMedium: segmentedPlateMedium,
  segmentedPlateLight: segmentedPlateLight,
  layeredLeatherLight: layeredLeatherLight,
  layeredLeatherMedium: layeredLeatherMedium,
  layeredClothMedium: layeredClothMedium,
  hardenedLeatherMedium: hardenedLeatherMedium,
  hardenedLeatherHeavy: hardenedLeatherHeavy,
  brigandineLight: brigandineLight,
  brigandineMedium: brigandineMedium,
  jackOfPlates: jackOfPlates,
  brigandineHeavy: brigandineHeavy,
};
