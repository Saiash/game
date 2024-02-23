import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'stealth',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

//Ус- пешный бросок (и примерно 30 минут) позволит вам подобраться к большинству животных на 30 яр- дов. Еще один бросок с -5 позволит вам подобраться на 15 ярдов

//минус уровень нагрузки; -5, чтобы спрятаться в местности без «естественных» ук- рытий; +3 или больше, если укры- тий много; -5, чтобы бесшумно бе- жать, а не идти (бесшумная ходьба проходит со скоростью 1 ярд в се- кунду); -5, чтобы обмануть облада- ющих Необычайным обонянием.

export const Stealth = skillFabric({ skillSettings });
