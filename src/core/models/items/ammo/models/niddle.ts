import { ammoFabric, ammoFabricType } from '../fabric';

const ammoSettings: ammoFabricType = {
  techLevel: 0,
  code: 'niddle',
  cost: 0.1,
  weight: 0.05,
  img: '',
  zones: [['ammo']],
};

export const Niddle = ammoFabric(ammoSettings);
