import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'pickpocket',
  parentAttrCode: 'dex',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { sleightOfHands: -4, filch: -5 },
};

// Мастер должен провести Быстрое состяза- ние умений – его высшее значение Восприятия и Знания улиц против вашего умения Карманное воровс- тво
// +5 если кли- ент отвлечена +10, если он спит или пьян; до -5 за предмет во внут- реннем кармане; до -10 за кольцо или подобную драгоценность.

export const Pickpocket = skillFabric({ skillSettings });
