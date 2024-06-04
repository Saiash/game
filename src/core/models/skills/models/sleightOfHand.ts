import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'sleightOfHand',
  parentAttrCode: 'dex',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { filch: -5 },
};

//TODO:  шуллерство в игре - дает до +5
//TODO:  +3 за свет, помощника, подготовка

export const SleightOfHands = skillFabric({ skillSettings });
