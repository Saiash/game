import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'cloak',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { shield: -4, net: -4 },
};

// Атака плащом это финт
// В защите легкий плащ +1, тяжелый +2 (1сп и 3/5 ЕЖ)

export const Cloak = skillFabric(skillSettings);
