import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'blindFighting',
  parentAttrCode: 'per',
  difficulty: 'very hard',
  defaultSkillTime: 0,
  cultureBased: false,
  relativeSkills: {},
};

//позволяет снять штрафы за темноту при атаке
//штраф за фо- новый шум: -1 за дождь, -2 ливень или буря, -3 – тяжелая техника или толпа, -4 за полный стадион,
//-5 среди канонады.

export const BlindFighting = skillFabric({ skillSettings });
