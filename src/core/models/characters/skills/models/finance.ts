// import { skillFabric, skillFabricType } from './index';

import { skillList } from ".";

// const skillSettings: skillFabricType = {
//   code: 'finance',
//   parentAttrCode: 'int',
//   difficulty: 'hard',
//   defaultSkillTime: 60,
//   cultureBased: true,
//   relativeSkills: { accounting: -3, economics: -3, merchant: -6 },
// };

// export const Finance = skillFabric({ skillSettings });


const dataStructure = `
Объект
  Навыки
    Финансы
      Атрибуты: Интеллект
      Сложность: Сложная
      Время: 60
      Зависит от культуры: Да
      Связанные навыки
        Бухгалтерский учет: -3
        Экономика: -3
        Торговля: -6
`

export const Finance: { code: skillList, rawStruct: string } = { code: 'finance', rawStruct: dataStructure };
