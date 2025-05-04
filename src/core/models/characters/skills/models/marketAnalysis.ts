// import { skillFabric, skillFabricType } from './index';

import { skillList } from ".";

// const skillSettings: skillFabricType = {
//   code: 'marketAnalysis',
//   parentAttrCode: 'int',
//   difficulty: 'hard',
//   defaultSkillTime: 60,
//   cultureBased: false,
//   relativeSkills: { economics: -5, merchant: -4 },
// };

// export const MarketAnalysis = skillFabric({ skillSettings });


const dataStructure = `
Объект
  Навыки
    Анализ рынка
      Атрибуты: Интеллект
      Сложность: Сложная
      Время: 60
      Связанные навыки
        Экономика: -5
        Торговля: -4 
`

export const MarketAnalysis: { code: skillList, rawStruct: string } = { code: 'marketAnalysis', rawStruct: dataStructure };
