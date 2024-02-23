import { spellFabric, spellFabricType } from './index';

const spellSettings: spellFabricType = {
  school: 'air',
  type: 'area',
  energy: 1,
  code: 'purifyAir',
  requirments: {},
};

//(требуется приблизительно два часа исследований, но может занять месяцы для крупных корпораций)

export const PurifyAir = spellFabric({ spellSettings });
