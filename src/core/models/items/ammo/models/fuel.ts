import { ammoFabric, ammoFabricType } from '../fabric';

const ammoSettings: ammoFabricType = {
  techLevel: 7,
  code: 'fuel',
  cost: 18, // TODO: нужна цена
  weight: 1,
  img: '',
  zones: [['ammo']],
};

export const Fuel = ammoFabric(ammoSettings);
