import { ammoFabric, ammoFabricType } from '../fabric';

const ammoSettings: ammoFabricType = {
  techLevel: 6,
  code: '0.44',
  cost: 2,
  weight: 0.05,
  img: '',
  zones: [['ammo']],
};

export const bullet044 = ammoFabric(ammoSettings);
