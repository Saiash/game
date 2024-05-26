import { ammoFabric, ammoFabricType } from '../fabric';

const ammoSettings: ammoFabricType = {
  techLevel: 6,
  code: '0.5',
  cost: 2,
  weight: 0.3,
  img: '',
  zones: [['ammo']],
};

export const bullet05 = ammoFabric(ammoSettings);
