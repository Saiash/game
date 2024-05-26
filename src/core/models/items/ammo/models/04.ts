import { ammoFabric, ammoFabricType } from '../fabric';

const ammoSettings: ammoFabricType = {
  techLevel: 6,
  code: '0.4',
  cost: 2,
  weight: 0.08,
  img: '',
  zones: [['ammo']],
};

export const bullet04 = ammoFabric(ammoSettings);
