import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'merchant',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 300,
  cultureBased: true,
  relativeSkills: { finance: -6, marketAnalysis: -4 },
};

// Когда двое торгуются, то Мастер может быстро рассудить их, проведя Состязание умений. Победитель до- бавляет или вычитает 10% из спра- ведливой цены товара, в зависимос- ти от того, пытался ли он его купить или продать.
// Персонаж, обладающий этим умением на любом уровне, получает +1 к броскам на реакцию при покуп- ке или продаже чего-либо. Персо- наж, располагающий данным уме- нием на уровне эксперта – 20 или выше – получает +2.

export const Merchant = skillFabric({ skillSettings });
