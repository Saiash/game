import { materialSettings, modificationFabric } from '../../fabric';

const settings: materialSettings = {
  tl: 2,
  code: 'silk',
  type: 'fabric',
  priceMultiplier: 19,
  DR: 1,
};

//TODO: +1 от на первую помощь ранам под такой броней или одеждой
//TODO: отменяет штраф -2 на инфекции
//TODO: отменяет эффект ядов

export const Silk = modificationFabric(settings);
