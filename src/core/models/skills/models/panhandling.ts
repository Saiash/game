import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'panhandling',
  parentAttrCode: 'int',
  difficulty: 'easy',
  defaultSkillTime: 3600,
  cultureBased: true,
  relativeSkills: {},
};

// Заговаривание Зубов-2, Публичное выступле- ние-3
// Успешный бросок – вы насо- бирали $2 за каждое очко успеш- ности броска
// Критический провал означает, что тот, у кого вы просили, позвал полицию или напал на вас

export const Panhandling = skillFabric({ skillSettings });
