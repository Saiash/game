import { ammoFabric, ammoFabricType } from '../fabric';

const ammoSettings: ammoFabricType = {
  techLevel: 4,
  code: '4',
  cost: 1,
  weight: 0.025,
  img: '',
  zones: [['ammo']],
};

export const bullet4 = ammoFabric(ammoSettings);
