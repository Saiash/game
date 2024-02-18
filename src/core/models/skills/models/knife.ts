import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'knife',
  parentAttrCode: 'dex',
  difficulty: 'easy',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

//Силовой меч-3, Дага-3, Короткий меч-3.

export const Knife = skillFabric(skillSettings);
