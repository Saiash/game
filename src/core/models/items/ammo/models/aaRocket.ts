import { ammoFabric, ammoFabricType } from '../fabric';

const ammoSettings: ammoFabricType = {
  techLevel: 7,
  code: 'aaRocket',
  cost: 20000, // TODO: нужна цена
  weight: 22,
  img: '',
  zones: [['ammo']],
};

export const AaRocket = ammoFabric(ammoSettings);
