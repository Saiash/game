import { ammoFabric, ammoFabricType } from '../fabric';

const ammoSettings: ammoFabricType = {
  techLevel: 6,
  code: '12G',
  cost: 2, //TODO - price
  weight: 0.12,
  img: '',
  zones: [['ammo']],
};

export const bullet12G = ammoFabric(ammoSettings);
