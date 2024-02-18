import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'piloting',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

// Бросок Пилотирования требу- ется при взлете и посадке, а также в любой опасной ситуации.
// Провал на 1 означает грубую работу; более серьёзная ошибка приводит к пов- реждения летательного аппарата; критический провал означает кру- шение.

export const Piloting = skillFabric(skillSettings);
