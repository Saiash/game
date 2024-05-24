import { ammoFabric, ammoFabricType } from '../fabric';

const ammoSettings: ammoFabricType = {
  techLevel: 2,
  code: 'bolt',
  cost: 2,
  weight: 0.06,
  img: '',
  zones: [['ammo']],
};

export const Bolt = ammoFabric(ammoSettings);
