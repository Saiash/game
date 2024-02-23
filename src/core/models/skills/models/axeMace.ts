import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'axeMace',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

export const AxeMace = skillFabric({ skillSettings });
