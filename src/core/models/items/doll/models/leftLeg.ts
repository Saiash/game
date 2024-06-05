import { DollBodyPart } from '.';
import { throwDices } from '../../../../utils/diceThrower';

export const leftLeg = {
  leftThigh: {},
  leftKnee: {},
  leftShin: {},
};

export class LeftLegBodyPart extends DollBodyPart {
  getZoneHit(): DollBodyPart {
    const val = throwDices(1, 6);
    if ([1, 2, 3].includes(val)) {
      return this.getInnerPartByKey('leftShin');
    } else if (val === 4) {
      return this.getInnerPartByKey('leftKnee');
    } else {
      return this.getInnerPartByKey('leftThigh');
    }
  }
}
