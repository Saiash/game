import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'diplomacy',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: true,
  relativeSkills: { politics: -6 },
};

// Успешный бросок позволит вам предсказать возможный исход опреде- ленного способа ведения переговоров или выбрать наилучший подход.
// Если ваше умение Дипломатия находится на уровне эксперта (20 или выше), то вы получаете премию +2 ко всем брос- кам на реакцию!

export const Diplomacy = skillFabric({ skillSettings });
