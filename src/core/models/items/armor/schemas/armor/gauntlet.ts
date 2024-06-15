import { armorSchema } from '..';

export const gauntlet: armorSchema = {
  techLevel: 0,
  code: 'gauntlet',
  zones: [
    ['leftPalm', 'leftWrist'],
    ['rightPalm', 'rightWrist'],
  ],
  matchingArmorTypes: [
    'layredClothLight',
    'paddedCloth',
    'hardenedLeatherMedium',
    'hardenedLeatherHeavy',
    'brigandineMedium',
    'brigandineHeavy',
    'mailFine',
    'straw',
    'layeredLeatherHeavy',
    'layeredLeatherMedium',
    'layeredClothHeavy',
    'jackOfPlates',
    'leatherHeavy',
    'leatherMedium',
    'mailAndPlates',
    'scaleLight',
    'scaleMedium',
    'scaleHeavy',
    'mailLight',
    'mailHeavy',
    'segmentedPlateLight',
    'segmentedPlateHeavy',
    'layeredClothMedium',
    'segmentedPlateMedium',
    'papperProofed',
    'layeredLeatherLight',
    'mailJousting',
    'plateLight',
    'plateMedium',
    'plateHeavy',
    'brigandineLight',
  ],
};