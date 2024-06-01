import { DollBodyPart } from '.';
import { throwDices } from '../../../../utils/diceThrower';

export const leftHand = {
  shoulder: {},
  upperArm: {},
  forearm: {},
  elbow: {},
  wrist: {},
  palm: {},
  finger: {},
};

export class LeftHandBodyPart extends DollBodyPart {
  getZoneHit(): DollBodyPart {
    const val = throwDices(1, 6);
    if ([1, 2, 3].includes(val)) {
      return this.getInnerPartByKey('forearm');
    } else if (val === 4) {
      return this.getInnerPartByKey('elbow');
    } else if (val === 5) {
      return this.getInnerPartByKey('upperArm');
    } else if (val === 6) {
      return this.getInnerPartByKey('shoulder');
    }
    return this;
  }
}
