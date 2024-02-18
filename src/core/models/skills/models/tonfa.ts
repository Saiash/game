import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'tonfa',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { shortsword: -3 },
};

export const Tonfa = skillFabric(skillSettings);
