import { ammoFabric, ammoFabricType } from '../fabric';

const ammoSettings: ammoFabricType = {
  techLevel: 4,
  code: '0.3',
  cost: 1,
  weight: 0.05,
  img: '',
  zones: [['ammo']],
};

export const bullet03 = ammoFabric(ammoSettings);
