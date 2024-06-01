import { PartialRecord } from '../../../../types';
import { equipZones } from './types';

export const coverageTable: PartialRecord<equipZones, number> = {
  head: 0.3,
  skull: 0.2,
  face: 0.1,
  neck: 0.05,
  torso: 1,
  chest: 0.75,
  belly: 0.25,
  pelvis: 0.05,
  leftHand: 0.5,
  rightHand: 0.5,
  shoulder: 0.1,
  upperArm: 0.1,
  elbow: 0.05,
  forearm: 0.25,
  palm: 0.1,
  leftLeg: 1,
  rightLeg: 1,
  thigh: 0.45,
  knee: 0.05,
  shin: 0.5,
  foot: 0.1,
};
