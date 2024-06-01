import { materialSettings, modificationFabric } from '../../fabric';

const settings: materialSettings = {
  tl: 2,
  code: 'spiderSilk',
  type: 'fabric',
  priceMultiplier: 99,
  DR: 2,
};

//TODO: +1 от на первую помощь ранам под такой броней или одеждой
//TODO: отменяет штраф -2 на инфекции
//TODO: отменяет эффект ядов

export const SpiderSilk = modificationFabric(settings);
