import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'teamster',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { animalHandling: -4, riding: -2 },
};

//TODO:  Во время обычного путешест- вия бросок умения делается раз в день.
//TODO:   Когда лошади, впряженные в карету или тянущие иной груз (например, пушку), мчатся гало- пом (80% или больше максималь- ной скорости), то возница должен делать бросок умения Кучер каж- дые 10 секунд.
//TODO:  Провальный бросок означает, что повозка перевернулась. Это равно падению с высоты 5 ярдов (5к-10 повреждений) для каждого человека и животного (см. Падение, с.431). И еще, для каждого живот- ного киньте два кубика; выпаде- ние 12 означает, то это животное сломало ногу!
//TODO:  Модификаторы: -2 за пять и более животных в упряж- ке, -2 за незнакомых живот- ных, -5 и больше за плохую местность.

export const Teamster = skillFabric({ skillSettings });
