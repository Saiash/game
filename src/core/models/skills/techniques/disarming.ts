import { CTX } from '../../../../types';
import { Attribute } from '../../characters/attributes/attribute';
import { SkillInputProps, SkillManager } from '../skillManager';
import { Skill } from '../skill';

const skillSettings: SkillInputProps = {
  name: 'Обезоруживание',
  description:
    'Если вы знакомы с этой тех- никой лучше, чем это предлагает уровень по умолчанию, вы можете использовать ее вместо основного умения, если пытаетесь обезору- жить противника',
  code: 'disarming',
  parentAttrCode: 'dex',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

export function Disarming({
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
