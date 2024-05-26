import { ammoFabric, ammoFabricType } from '../fabric';

const ammoSettings: ammoFabricType = {
  techLevel: 9,
  code: 'batteryl',
  cost: 20, //TODO - правильная цена?
  weight: 4,
  img: '',
  zones: [['ammo']],
};

export const Batteryl = ammoFabric(ammoSettings);

//TODO: батарейка имеет запас и тратит его, а не несколько батареек формируют боезапас.
