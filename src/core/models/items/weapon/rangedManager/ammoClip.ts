import { Ammo } from '../../ammo';
import { ammoList } from '../../ammo/models';

export type ammoClip = {
  maxAmmo: number;
  type: ammoList;
  currentAmmo: Ammo[];
};

export class AmmoClip {
  maxAmmo: number;
  type: ammoList;
  currentAmmo: Ammo[];

  constructor({ maxAmmo, type }: Omit<ammoClip, 'currentAmmo'>) {
    this.maxAmmo = maxAmmo;
    this.type = type;
    this.currentAmmo = [];
  }

  loadAmmo(ammo: Ammo) {
    if (this.currentAmmo.length >= this.maxAmmo) {
      return;
    }
    this.currentAmmo.push(ammo);
  }

  getCurrentAmmo(): Ammo {
    return this.currentAmmo[this.currentAmmo.length - 1];
  }
}
