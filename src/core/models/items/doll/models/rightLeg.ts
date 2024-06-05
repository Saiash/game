import { DollBodyPart } from '.';
import { throwDices } from '../../../../utils/diceThrower';

export const rightLeg = {
  rightThigh: {},
  rightKnee: {},
  rightShin: {},
};

export class RightLegBodyPart extends DollBodyPart {
  getZoneHit(): DollBodyPart {
    const val = throwDices(1, 6);
    if ([1, 2, 3].includes(val)) {
      return this.getInnerPartByKey('rightShin');
    } else if (val === 4) {
      return this.getInnerPartByKey('rightKnee');
    } else {
      return this.getInnerPartByKey('rightThigh');
    }
  }
}
