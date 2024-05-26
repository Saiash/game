import { ammoFabric, ammoFabricType } from '../fabric';

const ammoSettings: ammoFabricType = {
  techLevel: 4,
  code: '0.6',
  cost: 2,
  weight: 0.01,
  img: '',
  zones: [['ammo']],
};

export const bullet06 = ammoFabric(ammoSettings);
