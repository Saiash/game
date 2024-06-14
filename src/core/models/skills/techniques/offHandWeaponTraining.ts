import { CTX } from '../../../../types';
import { Attribute } from '../../characters/attributes/attribute';
import { SkillManager } from '../skillManager';
import { Skill } from '../skill';
import { SkillInputProps } from '../types';

const skillSettings: SkillInputProps = {
  name: 'Бой неосновной рукой',
  description:
    'Эта техника позволяет выку- пить штраф -4 за использование определенного контактного ору- жия неосновной рукой. При ата- ке будет использоваться уровень техники, а не умения – как для атаки, так и для парирования.',
  code: 'offHandWeaponTraining',
  parentAttrCode: 'dex',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

export function OffHandWeaponTraining({
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
