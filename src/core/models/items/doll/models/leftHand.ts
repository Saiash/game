import { DollBodyPart } from '.';
import { throwDices } from '../../../../utils/diceThrower';

export const leftHand = {
  leftShoulder: {},
  leftUpperArm: {},
  leftForearm: {},
  leftElbow: {},
  leftWrist: {},
};

export class LeftHandBodyPart extends DollBodyPart {
  getZoneHit(): DollBodyPart {
    const val = throwDices(1, 6);
    if ([1, 2, 3].includes(val)) {
      return this.getInnerPartByKey('leftForearm');
    } else if (val === 4) {
      return this.getInnerPartByKey('leftElbow');
    } else if (val === 5) {
      return this.getInnerPartByKey('leftUpperArm');
    } else if (val === 6) {
      return this.getInnerPartByKey('leftShoulder');
    }
    return this;
  }
}
