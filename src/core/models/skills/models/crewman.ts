import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'crewman',
  parentAttrCode: 'int',
  difficulty: 'easy',
  defaultSkillTime: 60,
  cultureBased: true,
  relativeSkills: {},
};

export const Crewman = skillFabric(skillSettings);
