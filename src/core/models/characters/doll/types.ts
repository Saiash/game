//ITEM ZONES TYPES

import _ from "lodash";

export const head = {
  skull: { hat: {} },
  eyes: { leftEye: {}, rightEye: {} },
  ears: { leftEar: {}, rightEar: {} },
  mouth: { tongue: {} },
  tongue: {},
  nose: {},
  face: {},
}

export const torso = {
  chest: { vitals: {} },
  belly: {},
  belt: {},
  back: {},
  pelvis: {},
};

export const leftArm = {
  leftShoulder: {},
  leftUpperArm: {},
  leftForearm: {},
  leftElbow: {},
  leftWrist: {},
};

export const rightArm = {
  rightShoulder: {},
  rightUpperArm: {},
  rightForearm: {},
  rightElbow: {},
  rightWrist: {},
};

export const rightPalm = {
  rightPalm: { rightFingers: {} },
};

export const leftPalm = {
  leftPalm: { leftFingers: {} },
};

export const neck = {};

export const leftLeg = {
  leftThigh: {},
  leftKnee: {},
  leftShin: {},
};

export const rightLeg = {
  rightThigh: {},
  rightKnee: {},
  rightShin: {},
};

export const rightFoot = {
  rightFoot: { rightToe: {} },
};

export const leftFoot = {
  leftFoot: { leftToe: {} },
};


export const majorStructure = {
  leftArm: leftArm,
  rightArm: rightArm,
  torso: torso,
  head: head,
  leftLeg: leftLeg,
  rightLeg: rightLeg,
  neck: neck,
  leftFoot: leftFoot,
  rightFoot: rightFoot,
  leftPalm: leftPalm,
  rightPalm: rightPalm,
};

export const additionalStructure = {
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

export type headZonesGroup = keyof typeof head | keyof typeof head.skull;
export type torsoZonesGroup = keyof typeof torso | keyof typeof torso.chest;
export type leftLegZonesGroup = keyof typeof leftLeg;
export type rightLegZonesGroup = keyof typeof rightLeg;
export type leftHandZonesGroup = keyof typeof leftArm;
export type rightHandZonesGroup = keyof typeof rightArm;
export type bodyZonesGroup = keyof typeof torso;

export type eyesZonesGroup = keyof typeof head.eyes;
export type earsZonesGroup = keyof typeof head.ears;
export type mouthZonesGroup = keyof typeof head.mouth;

export type bodyPartsList =
  | majorBodyParts
  | additionalBodyParts
  | headZonesGroup
  | torsoZonesGroup
  | leftLegZonesGroup
  | rightLegZonesGroup
  | bodyZonesGroup
  | leftHandZonesGroup
  | rightHandZonesGroup
  | eyesZonesGroup
  | earsZonesGroup
  | mouthZonesGroup;

//TODO - утащить в менеджеры боя
// export type battleZones =
//   | majorBodyParts
//   | 'skull'
//   | 'face'
//   | 'eyes'
//   | 'leftPalm'
//   | 'rightPalm'
//   | 'leftFoot'
//   | 'rightFoot'
//   | 'vitals'
//   | 'pelvis';
