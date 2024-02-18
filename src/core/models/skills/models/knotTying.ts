import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'knotTying',
  parentAttrCode: 'dex',
  difficulty: 'easy',
  defaultSkillTime: 60,
  cultureBased: false,
  relativeSkills: { climbing: -4, crewman: -4 },
};

// узел обладает сложностью; надо выкинуть больше, что бы освободиться

export const KnotTying = skillFabric(skillSettings);
