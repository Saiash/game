import { ammoFabric, ammoFabricType } from '../fabric';

const ammoSettings: ammoFabricType = {
  techLevel: 6,
  code: '0.338',
  cost: 5,
  weight: 0.2,
  img: '',
  zones: [['ammo']],
};

export const bullet0338 = ammoFabric(ammoSettings);
