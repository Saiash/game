import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'mimicry',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { naturalist: -3, acting: -6, linguistics: -4 },
};

export const Mimicry = skillFabric({ skillSettings });
