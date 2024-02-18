import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'antopology',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 60,
  cultureBased: true,
  relativeSkills: { paleontology: -2, sociology: -3 },
};
//Палеоан- тропология-2, Социология-3.

export const Antopology = skillFabric(skillSettings);
