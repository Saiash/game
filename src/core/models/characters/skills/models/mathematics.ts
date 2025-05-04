// import { skillFabric, skillFabricType } from './index';

import { skillList } from ".";

// const skillSettings: skillFabricType = {
//   code: 'mathematics',
//   parentAttrCode: 'int',
//   difficulty: 'hard',
//   defaultSkillTime: 300,
//   cultureBased: false,
//   relativeSkills: {},
// };

// export const Mathematics = skillFabric({ skillSettings });

const dataStructure = `
Объект
  Навыки
    Математика
      Атрибуты: Интеллект
      Сложность: Сложная
      Время: 300
`

export const Mathematics: { code: skillList, rawStruct: string } = { code: 'mathematics', rawStruct: dataStructure };
