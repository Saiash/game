import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'accounting',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 7200,
  cultureBased: true,
  relativeSkills: { merchant: -5, mathematics: -5, finance: -4 },
};

//(требуется приблизительно два часа исследований, но может занять месяцы для крупных корпораций)

export const Accounting = skillFabric({ skillSettings });
