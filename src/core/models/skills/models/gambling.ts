import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'gambling',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 300,
  cultureBased: false,
  relativeSkills: { mathematics: -5 },
};

// быстрое состязание если против кого-то, иначе просто против казино

export const Gambling = skillFabric(skillSettings);
