import { DollBodyPart } from '.';
import { throwDices } from '../../../../utils/diceThrower';

export const rightLeg = {
  thigh: {},
  knee: {},
  shin: {},
  foot: {},
  toe: {},
};

export class RightLegBodyPart extends DollBodyPart {
  getZoneHit(): DollBodyPart {
    const val = throwDices(1, 6);
    if ([1, 2, 3].includes(val)) {
      return this.getInnerPartByKey('shin');
    } else if (val === 4) {
      return this.getInnerPartByKey('knee');
    } else {
      return this.getInnerPartByKey('thigh');
    }
  }
}
