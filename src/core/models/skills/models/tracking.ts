import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'tracking',
  parentAttrCode: 'per',
  difficulty: 'medium',
  defaultSkillTime: 60,
  cultureBased: false,
  relativeSkills: { naturalist: -5 },
};

//TODO:  Если за вами следует другой следопыт, то Мастер будет проводить между вами состязание умений Следопыт с описанными выше модификатора- ми.
/*TODO: 
Равнины, Джунгли, Лес: раз в 30 минут;
Пустыня, Горы, Арктика, Ост- ров/Пляж: раз в 15 минут с -2. Болота: раз в 5 минут с -4.
Город: раз в минуту с -6! */
//TODO:  -5, если следы были оставлены более дня назад, -10, если следам больше недели;
//TODO:  +5, если вы идете по человеческим следам, +10, если вы идете по сле- дам группы людей. То, по какой местности вы идете, тоже играет свою роль, штраф составляет -3 в пустыни, -5 на сухих камнях, -10 на улице города!

export const Tracking = skillFabric({ skillSettings });
