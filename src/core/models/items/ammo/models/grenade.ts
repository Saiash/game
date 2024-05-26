import { ammoFabric, ammoFabricType } from '../fabric';

const ammoSettings: ammoFabricType = {
  techLevel: 7,
  code: 'grenade',
  cost: 100, // TODO: нужна цена
  weight: 3.4,
  img: '',
  zones: [['ammo']],
};

export const Grenade = ammoFabric(ammoSettings);
