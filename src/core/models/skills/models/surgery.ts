import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'surgery',
  parentAttrCode: 'int',
  difficulty: 'very hard',
  defaultSkillTime: 60,
  cultureBased: false,
  relativeSkills: {
    veterinary: -5,
    physician: -5,
    physiology: -8,
    firstAid: -12,
  },
};

// до 3к урона при провале
// если операция проходит на го- лове или грудной клетке; -5, если проблема не диагностирована; -3 или хуже, если оборудование как следует не отчищено и не стерили- зовано. Если вы не знакомы с умени- ем Врачебное дело, вы получаете -5 на любые операции, кроме самых элементарных – обработка ран, из- влечение пуль и осколков.

export const Surgery = skillFabric(skillSettings);
