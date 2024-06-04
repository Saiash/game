import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'typing',
  parentAttrCode: 'dex',
  difficulty: 'easy',
  defaultSkillTime: 60,
  cultureBased: false,
  relativeSkills: {},
};

//TODO:  Скорость печата- ния равна умение ×3 слов в минуту на печатной машинке или умение ×5 на электронной или электричес- кой клавиатуре.

export const Typing = skillFabric({ skillSettings });
