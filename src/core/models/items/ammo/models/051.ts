import { ammoFabric, ammoFabricType } from '../fabric';

const ammoSettings: ammoFabricType = {
  techLevel: 4,
  code: '0.51',
  cost: 2,
  weight: 0.01,
  img: '',
  zones: [['ammo']],
};

export const bullet051 = ammoFabric(ammoSettings);
