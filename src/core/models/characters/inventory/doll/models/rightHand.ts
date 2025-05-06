import { DollBodyPart } from '.';
import { throwDices } from '../../../../../utils/diceThrower';

export const rightHand = {
  rightShoulder: {},
  rightUpperArm: {},
  rightForearm: {},
  rightElbow: {},
  rightWrist: {},
};

export class RightHandBodyPart extends DollBodyPart {
  getZoneHit(): DollBodyPart {
    const val = throwDices(1, 6);
    if ([1, 2, 3].includes(val)) {
      return this.getInnerPartByKey('rightForearm');
    } else if (val === 4) {
      return this.getInnerPartByKey('rightElbow');
    } else if (val === 5) {
      return this.getInnerPartByKey('rightUpperArm');
    } else if (val === 6) {
      return this.getInnerPartByKey('rightShoulder');
    }
    return this;
  }
}
