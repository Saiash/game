import { ammoFabric, ammoFabricType } from '../fabric';

const ammoSettings: ammoFabricType = {
  techLevel: 0,
  code: 'bullet',
  cost: 0.01,
  weight: 0.05,
  img: '',
  zones: [['ammo']],
};

export const Bullet = ammoFabric(ammoSettings);
