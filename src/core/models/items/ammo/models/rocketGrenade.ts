import { ammoFabric, ammoFabricType } from '../fabric';

const ammoSettings: ammoFabricType = {
  techLevel: 7,
  code: 'rocketGrenade',
  cost: 200, // TODO: нужна цена
  weight: 5.7,
  img: '',
  zones: [['ammo']],
};

export const RocketGrenade = ammoFabric(ammoSettings);
