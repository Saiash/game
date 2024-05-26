import { ammoFabric, ammoFabricType } from '../fabric';

const ammoSettings: ammoFabricType = {
  techLevel: 4,
  code: '0.57',
  cost: 3,
  weight: 0.05,
  img: '',
  zones: [['ammo']],
};

export const bullet057 = ammoFabric(ammoSettings);
