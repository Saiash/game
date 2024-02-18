import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'falconry',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 3600,
  cultureBased: false,
  relativeSkills: { animalHandling: -3 },
};

// Чтобы найти гнездо сокола весной, нужно пот- ратить неделю на поиски и удачно выполнить бросок умения Соко- линая охота; в новом гнезде будет 1к-3 птенцов.

export const Falconry = skillFabric(skillSettings);
