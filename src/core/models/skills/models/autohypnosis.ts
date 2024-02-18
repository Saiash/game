import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'astronomy',
  parentAttrCode: 'will',
  difficulty: 'hard',
  defaultSkillTime: 20,
  cultureBased: false,
  relativeSkills: { hypnotism: -4 },
};
//эффекты: Улучшение концентрации:
/*вы получаете +2 на определен- ную длительную ментальную работу (написание программы или взлом шифра), но -2 на все остальные броски ИН, Воспри- ятия и умений. Задача должна быть относительно спокойной и выполняться в тихом месте (библиотека, лаборатория, мо- настырь и пр.).
Увеличение воли: вы получае- те +2 к Воле (+5 на критическом успехе) на один час. Премия помогает при сопротивлении допросу, пыткам, магическим или ментальным атакам. Этот бросок делается с -2.
Игнорирование боли/уста- лости: уменьшение негатив- ных эффектов уменьшения ваших ЕЖ или ЕУ ниже 1/3 обычных (но не сами усталость и раны). Бросок делается с -4, и позволена только одна попыт- ка в час.*/

export const Autohypnosis = skillFabric(skillSettings);
