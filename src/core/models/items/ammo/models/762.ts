import { ammoFabric, ammoFabricType } from '../fabric';

const ammoSettings: ammoFabricType = {
  techLevel: 6,
  code: '7.62',
  cost: 1,
  weight: 0.06,
  img: '',
  zones: [['ammo']],
};

export const bullet762 = ammoFabric(ammoSettings);
