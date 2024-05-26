import { ammoFabric, ammoFabricType } from '../fabric';

const ammoSettings: ammoFabricType = {
  techLevel: 5,
  code: '0.38',
  cost: 2,
  weight: 0.08,
  img: '',
  zones: [['ammo']],
};

export const bullet038 = ammoFabric(ammoSettings);
