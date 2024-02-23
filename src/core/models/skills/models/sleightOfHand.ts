import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'sleightOfHand',
  parentAttrCode: 'dex',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { filch: -5 },
};

// шуллерство в игре - дает до +5
// +3 за свет, помощника, подготовка

export const SleightOfHands = skillFabric({ skillSettings });
