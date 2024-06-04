import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'throwing',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { dropping: -4 },
};

//TODO:  Она влия- ет и на точность (делайте бросок уме- ния Метания, чтобы бросить что-либо, что вы можете поднять), и на дистан- цию броска (добавьте +1 к своей СЛ при вычислении дистанции броска (но не повреждений), если вы знаете умение Метание на уровне ЛВ+1, и +2, если на уровне ЛВ+2 и выше).

export const Throwing = skillFabric({ skillSettings });
