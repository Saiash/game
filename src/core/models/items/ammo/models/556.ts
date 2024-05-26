import { ammoFabric, ammoFabricType } from '../fabric';

const ammoSettings: ammoFabricType = {
  techLevel: 6,
  code: '5.56',
  cost: 1,
  weight: 0.03,
  img: '',
  zones: [['ammo']],
};

export const bullet556 = ammoFabric(ammoSettings);
