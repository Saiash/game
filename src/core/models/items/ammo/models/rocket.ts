import { ammoFabric, ammoFabricType } from '../fabric';

const ammoSettings: ammoFabricType = {
  techLevel: 7,
  code: 'rocket',
  cost: 500, // TODO: нужна цена
  weight: 5,
  img: '',
  zones: [['ammo']],
};

export const Rocket = ammoFabric(ammoSettings);
