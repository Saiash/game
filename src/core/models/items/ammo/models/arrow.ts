import { ammoFabric, ammoFabricType } from '../fabric';

const ammoSettings: ammoFabricType = {
  techLevel: 0,
  code: 'arrow',
  cost: 2,
  weight: 0.1,
  img: '',
  zones: [['ammo']],
};

export const Arrow = ammoFabric(ammoSettings);
