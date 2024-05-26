import { ammoFabric, ammoFabricType } from '../fabric';

const ammoSettings: ammoFabricType = {
  techLevel: 6,
  code: '0.9',
  cost: 1,
  weight: 0.03,
  img: '',
  zones: [['ammo']],
};

export const bullet09 = ammoFabric(ammoSettings);
