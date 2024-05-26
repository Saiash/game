import { ammoFabric, ammoFabricType } from '../fabric';

const ammoSettings: ammoFabricType = {
  techLevel: 7,
  code: 'atgmRocket',
  cost: 10000, // TODO: нужна цена
  weight: 26,
  img: '',
  zones: [['ammo']],
};

export const AtgmRocket = ammoFabric(ammoSettings);
