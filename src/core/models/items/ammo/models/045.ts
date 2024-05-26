import { ammoFabric, ammoFabricType } from '../fabric';

const ammoSettings: ammoFabricType = {
  techLevel: 6,
  code: '0.45',
  cost: 2,
  weight: 0.07,
  img: '',
  zones: [['ammo']],
};

export const bullet045 = ammoFabric(ammoSettings);
