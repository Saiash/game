import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'animalHandling',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};
//В бою против животных, животные получают -1, -2 если навык больше 20

export const AnimalHandling = skillFabric(skillSettings);
