import { skillList } from '.';

// const skillSettings: skillFabricType = {
//   code: 'accounting',
//   parentAttrCode: 'int',
//   difficulty: 'hard',
//   defaultSkillTime: 7200,
//   cultureBased: true,
//   relativeSkills: { merchant: -5, mathematics: -5, finance: -4 },
// };

const dataStructure = `
Объект
  Навыки
    Бухгалтерский учет
      Атрибуты: Интеллект
      Сложность: Сложная
      Время: 7200
      Зависит от культуры: Да
      Связанные навыки
        Торговля: -5
        Математика: -5
        Финансы: -4
`

//(требуется приблизительно два часа исследований, но может занять месяцы для крупных корпораций)

export const Accounting: { code: skillList, rawStruct: string } = { code: 'accounting', rawStruct: dataStructure };
