import { CTX } from '../../../../types';
import { Attribute } from '../../characters/attributes/attribute';
import { SkillManager } from '../skillManager';
import { Skill } from '../skill';
import { SkillInputProps } from '../types';

const skillSettings: SkillInputProps = {
  name: 'Двойная атака',
  description:
    'Если вы не используете То- тальную атаку и данную технику, то при атаке с двух рук сразу вы получаете -4 на бросок атаки. Эта техника позволяет вам выкупить штраф. (обратите внимание, что вам необходимо знать также и Тре- нировка левой руки, (с.232), чтобы снять положенный за использова- ние неосновной руки штраф -4.',
  code: 'dualWeaponAttack',
  parentAttrCode: 'dex',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

export function DualWeaponAttack({
  ctx,
  parentAttr,
  skillManager,
}: {
  ctx: CTX;
  parentAttr: Attribute;
  skillManager: SkillManager;
}) {
  return new Skill({
    props: { ...skillSettings, exp: 0, parentAttr, skillManager },
    ctx,
  });
}
