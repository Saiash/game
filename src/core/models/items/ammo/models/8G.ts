import { ammoFabric, ammoFabricType } from '../fabric';

const ammoSettings: ammoFabricType = {
  techLevel: 6,
  code: '8G',
  cost: 2, //TODO - price
  weight: 0.13,
  img: '',
  zones: [['ammo']],
};

export const bullet8G = ammoFabric(ammoSettings);
