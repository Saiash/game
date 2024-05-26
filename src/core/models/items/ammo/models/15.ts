import { ammoFabric, ammoFabricType } from '../fabric';

const ammoSettings: ammoFabricType = {
  techLevel: 6,
  code: '1.5',
  cost: 5,
  weight: 0.1,
  img: '',
  zones: [['ammo']],
};

export const bullet15 = ammoFabric(ammoSettings);
