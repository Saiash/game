// const skillSettings: skillFabricType = {
//   code: 'merchant',
//   parentAttrCode: 'int',
//   difficulty: 'medium',
//   defaultSkillTime: 300,
//   cultureBased: true,
//   relativeSkills: { finance: -6, marketAnalysis: -4 },
// };

import { skillList } from ".";

// // Когда двое торгуются, то Мастер может быстро рассудить их, проведя Состязание умений. Победитель до- бавляет или вычитает 10% из спра- ведливой цены товара, в зависимос- ти от того, пытался ли он его купить или продать.
// // Персонаж, обладающий этим умением на любом уровне, получает +1 к броскам на реакцию при покуп- ке или продаже чего-либо. Персо- наж, располагающий данным уме- нием на уровне эксперта – 20 или выше – получает +2.

// export const Merchant = skillFabric({ skillSettings });


const dataStructure = `
Объект
  Навыки
    Торговля
      Атрибуты: Интеллект
      Сложность: Средняя
      Время: 300
      Зависит от культуры: Да
      Связанные навыки
        Анализ рынка: -4
        Финансы: -6
`

export const Merchant: { code: skillList, rawStruct: string } = { code: 'merchant', rawStruct: dataStructure };
