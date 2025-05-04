// import { skillFabric, skillFabricType } from './index';

import { skillList } from ".";

// const skillSettings: skillFabricType = {
//   code: 'economics',
//   parentAttrCode: 'int',
//   difficulty: 'hard',
//   defaultSkillTime: 60,
//   cultureBased: false,
//   relativeSkills: { marketAnalysis: -5, finance: -3, merchant: -6 },
// };

// export const Economics = skillFabric({ skillSettings });


const dataStructure = `
Объект
  Навыки
    Экономика
      Атрибуты: Интеллект
      Сложность: Сложная
      Время: 60
      Связанные навыки
        Анализ рынка: -5
        Финансы: -3
        Торговля: -6
`

export const Economics: { code: skillList, rawStruct: string } = { code: 'economics', rawStruct: dataStructure };
