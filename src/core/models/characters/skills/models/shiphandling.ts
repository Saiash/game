import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'shiphandling',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 10,
  cultureBased: false,
  relativeSkills: {},
};

// TODO: провал в плохую погоду - повреждения
// TODO: провал в бою - фейл маневра, -10% урона за значение провала
// TODO: -2, если вы ве- дете незнакомый вам тип кораб- ля. -2, если вам незнаком экипаж; -2 и больше за плохое состояние судна.

export const Shiphandling = skillFabric({ skillSettings });
