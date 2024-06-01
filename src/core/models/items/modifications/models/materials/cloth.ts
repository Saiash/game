import { materialSettings, modificationFabric } from '../../fabric';

const settings: materialSettings = {
  tl: 0,
  code: 'cloth',
  type: 'fabric',
  priceMultiplier: 0,
};

export const Cloth = modificationFabric(settings);
