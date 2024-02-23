import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'interrogation',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 300,
  cultureBased: false,
  relativeSkills: { psychology: -4, intimidation: -3 },
};

// быстрое состязание против воли допрашиваемого
// провал на 5+ - допрашивающий верит в ложь
// +3 за угрозы, +6 за пытки

export const Interrogation = skillFabric({ skillSettings });
