import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'filch',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { sleightOfHands: -4, pickpocket: -4 },
};

// +3 за сообщника, +3 за плохой свет
//Потенциально быстрое состязание против зрения наблюдателя

export const Filch = skillFabric(skillSettings);
