import { throwDices } from '../../../../utils/diceThrower';
import { battleZones } from '../types';
import { DollBodyPart } from '.';

export const torso = {
  chest: { vitals: {} },
  belly: {},
  belt: {},
  back: {},
  pelvis: {},
};

export class TorsoBodyPart extends DollBodyPart {
  getZoneHit(): DollBodyPart {
    const val = throwDices(1, 6);
    if (val === 1) {
      return this.getInnerPartByKey('chest').getInnerPartByKey('vitals');
    }
    return this;
  }
}

export class ChestBodyPart extends DollBodyPart {
  getZoneHit(): DollBodyPart {
    const val = throwDices(1, 6);
    if (val === 1) {
      return this.getInnerPartByKey('vitals');
    }
    return this;
  }
}

export class PelvisBodyPart extends DollBodyPart {
  getZoneHit(): DollBodyPart {
    const val = throwDices(1, 6);
    if (val === 1) {
      return this.dollManager
        .getInnerPartByKey('chest')
        .getInnerPartByKey('vitals');
    }
    return this;
  }
}
