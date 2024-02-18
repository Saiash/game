import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'streetwise',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 3600,
  cultureBased: false,
  relativeSkills: {},
};

//Каждый раз, когда требуется бросок реакции со стороны пре- ступного мира или «неприятных соседей», вы можете заменить его броском Знания улиц;

export const Streetwise = skillFabric(skillSettings);
