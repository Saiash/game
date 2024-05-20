export type ammoType = '9mm' | '.50' | '7.62mm' | 'none' | 'niddle';

export type ammoClip = {
  maxAmmo: number;
  currentAmmo: number;
  type: ammoType;
};
