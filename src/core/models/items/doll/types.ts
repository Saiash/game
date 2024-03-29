//ITEM ZONES TYPES

import { body } from './models/_body';
import { head } from './models/head';
import { leftHand } from './models/leftHand';
import { leftLeg } from './models/leftLeg';
import { neck } from './models/neck';
import { rightHand } from './models/rightHand';
import { rightLeg } from './models/rightLeg';

export const majorStructure = {
  leftHand: leftHand,
  rightHand: rightHand,
  body: body,
  head: head,
  leftLeg: leftLeg,
  rightLeg: rightLeg,
  neck: neck,
};

export const additionalStructure = {
  weapons: {},
  ammo: {},
  backpack: {},
  rightTool: {},
  leftTool: {},
};

export const dollStructure = {
  ...majorStructure,
  ...additionalStructure,
};

export type majorBodyParts = keyof typeof majorStructure;
export type additionalBodyParts = keyof typeof additionalStructure;

export type headZonesGroup = keyof typeof head;
export type leftLegZonesGroup = keyof typeof leftLeg;
export type rightLegZonesGroup = keyof typeof rightLeg;
export type leftHandZonesGroup = keyof typeof leftHand;
export type rightHandZonesGroup = keyof typeof rightHand;
export type bodyZonesGroup = keyof typeof body;

export type eyesZonesGroup = keyof typeof head.eyes;
export type earsZonesGroup = keyof typeof head.ears;
export type mouthZonesGroup = keyof typeof head.mouth;

export type equipZones =
  | majorBodyParts
  | additionalBodyParts
  | headZonesGroup
  | leftLegZonesGroup
  | rightLegZonesGroup
  | bodyZonesGroup
  | leftHandZonesGroup
  | rightHandZonesGroup
  | eyesZonesGroup
  | mouthZonesGroup
  | earsZonesGroup;

export type battleZones =
  | majorBodyParts
  | 'skull'
  | 'eyes'
  | 'leftPalm'
  | 'rightPalm'
  | 'leftFoot'
  | 'rightFoot'
  | 'vitals'
  | 'pelvis';
