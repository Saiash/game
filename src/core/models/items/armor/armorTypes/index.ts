import { armorProps } from '..';
import { ItemProps } from '../../item';
import { materialTypes } from '../../modifications/models/materials';

import { Game } from '../../../../../components/game';
import { brigandineHeavy } from './metal/brigandineHeavy';
import { jackOfPlates } from './metal/jackOfPlates';
import { brigandineMedium } from './metal/brigandineMedium';
import { brigandineLight } from './metal/brigandineLight';
import { hardenedLeatherHeavy } from './leather/hardenedLeatherHeavy';
import { hardenedLeatherMedium } from './leather/hardenedLeatherMedium';
import { layeredClothMedium } from './fabric/layeredClothMedium';
import { layeredLeatherMedium } from './leather/layeredLeatherMedium';
import { layeredLeatherLight } from './leather/layeredLeatherLight';
import { segmentedPlateLight } from './metal/segmentedPlateLight';
import { segmentedPlateMedium } from './metal/segmentedPlateMedium';
import { scaleHeavy } from './metal/scaleHeavy';
import { segmentedPlateHeavy } from './metal/segmentedPlateHeavy';
import { scaleMedium } from './metal/scaleMedium';
import { mailJousting } from './metal/mailJousting';
import { scaleLight } from './metal/scaleLight';
import { plateHeavy } from './metal/plateHeavy';
import { wood } from './wood/wood';
import { mailHeavy } from './metal/mailHeavy';
import { mailLight } from './metal/mailLight';
import { plateMedium } from './metal/plateMedium';
import { layredClothLight } from './fabric/layeredClothLight';
import { cane } from './fabric/cane';
import { horn } from './bone/horn';
import { straw } from './wood/straw';
import { paddedCloth } from './fabric/paddedCloth';
import { layeredClothHeavy } from './fabric/layeredClothHeavy';
import { layeredLeatherHeavy } from './leather/layeredLeatherHeavy';
import { leatherHeavy } from './leather/leatherHeavy';
import { leatherMedium } from './leather/leatherMedium';
import { plateLight } from './metal/plateLight';
import { mailAndPlates } from './metal/mailAndPlates';
import { mailFine } from './metal/mailFine';
import { papperProofed } from './wood/papperProofed';
import { clothesTypesModels, clothTypesList } from './cloth';

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
  | 'brigandineLight'
  | clothTypesList;

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
  ...clothesTypesModels,
};
