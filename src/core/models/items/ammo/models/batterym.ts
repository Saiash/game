import { ammoFabric, ammoFabricType } from '../fabric';

const ammoSettings: ammoFabricType = {
  techLevel: 9,
  code: 'batterym',
  cost: 20, //TODO - правильная цена?
  weight: 1,
  img: '',
  zones: [['ammo']],
};

export const Batterym = ammoFabric(ammoSettings);

//TODO: батарейка имеет запас и тратит его, а не несколько батареек формируют боезапас.
