import { ammoFabric, ammoFabricType } from '../fabric';

const ammoSettings: ammoFabricType = {
  techLevel: 6,
  code: '0.41',
  cost: 5,
  weight: 0.05,
  img: '',
  zones: [['ammo']],
};

export const bullet041 = ammoFabric(ammoSettings);
