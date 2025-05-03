import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'smuggling',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 60,
  cultureBased: false,
  relativeSkills: {},
};

//TODO:  От обычного осмот- ра помогает простой бросок уме- ния, при внимательном осмотре требуется состязание.

export const Smuggling = skillFabric({ skillSettings });
