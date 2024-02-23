import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'exorcism',
  parentAttrCode: 'will',
  difficulty: 'hard',
  defaultSkillTime: 3600,
  cultureBased: true,
  relativeSkills: { theology: -3, religiousRitual: -3, ritualMagic: -3 },
};

// 15 минут за ЗД духа
// При провале ждать неделю
// При критпровале - бросок страха +10
// При успехе - состязание СЛ/воли духа, + Cл или воля человека, в которого вселился дух

export const Exorcism = skillFabric({ skillSettings });
