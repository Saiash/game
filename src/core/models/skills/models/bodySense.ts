import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'bodySense',
  parentAttrCode: 'dex',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { acrobatics: -3 },
};

export const BodySense = skillFabric(skillSettings);
