import { ammoFabric, ammoFabricType } from '../fabric';

const ammoSettings: ammoFabricType = {
  techLevel: 5,
  code: '0.36',
  cost: 3,
  weight: 0.04,
  img: '',
  zones: [['ammo']],
};

export const bullet036 = ammoFabric(ammoSettings);
