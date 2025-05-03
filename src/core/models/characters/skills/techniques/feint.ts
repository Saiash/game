import { CTX } from '../../../../types';
import { Attribute } from '../../characters/attributes/attribute';
import { SkillManager } from '../../characters/skills/skillManager';
import { Skill } from '../skill';
import { SkillInputProps } from '../types';

const skillSettings: SkillInputProps = {
  name: 'Финт',
  description:
    'Если вы знакомы с этой тех- никой лучше, чем это предлагает уровень по умолчанию, вы можете использовать ее вместо основного умения, если пытаетесь провес- ти финт против противника ',
  code: 'feint',
  parentAttrCode: 'dex',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

export function Feint({
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
