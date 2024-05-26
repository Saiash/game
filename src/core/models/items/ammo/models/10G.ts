import { ammoFabric, ammoFabricType } from '../fabric';

const ammoSettings: ammoFabricType = {
  techLevel: 6,
  code: '10G',
  cost: 2, //TODO - price
  weight: 0.05,
  img: '',
  zones: [['ammo']],
};

export const bullet10G = ammoFabric(ammoSettings);
