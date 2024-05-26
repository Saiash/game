import { ammoFabric, ammoFabricType } from '../fabric';

const ammoSettings: ammoFabricType = {
  techLevel: 4,
  code: '0.75',
  cost: 3,
  weight: 0.05,
  img: '',
  zones: [['ammo']],
};

export const bullet075 = ammoFabric(ammoSettings);
