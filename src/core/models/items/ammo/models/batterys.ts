import { ammoFabric, ammoFabricType } from '../fabric';

const ammoSettings: ammoFabricType = {
  techLevel: 9,
  code: 'batterys',
  cost: 20, //TODO - правильная цена?
  weight: 0.5,
  img: '',
  zones: [['ammo']],
};

export const Batterys = ammoFabric(ammoSettings);

//TODO: батарейка имеет запас и тратит его, а не несколько батареек формируют боезапас.
