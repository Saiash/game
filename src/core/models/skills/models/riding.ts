import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'riding',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

// +5, если жи- вотное знает вас и вы ему нрави- тесь; +1 и больше, если животное имеет умение Скакун (с.210). -10, если животное не ездовое или необъезженное.

export const Riding = skillFabric({ skillSettings });
