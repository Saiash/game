import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'mainGauche',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { jitte: -4, knife: -4 },
};

// -4 к атаке, нет штрафа к парированию от левой руки

export const MainGauche = skillFabric(skillSettings);
