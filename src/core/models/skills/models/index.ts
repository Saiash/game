import { getLocalisedText } from '../../../../translations';
import { CTX } from '../../../../types';
import { Character } from '../../characters';
import { SkillInputProps, SkillManager } from '../../characters/skills';
import { SkillResolver } from '../../characters/skills/resolvers';
import { Skill } from '../../characters/skills/skill';

export type skillFabricType = Omit<SkillInputProps, 'name' | 'description'>;

export function skillFabric(
  skillSettings: skillFabricType,
  resolverClass?: typeof SkillResolver
) {
  return ({
    ctx,
    character,
    skillManager,
  }: {
    ctx: CTX;
    character: Character;
    skillManager: SkillManager;
  }) => {
    const parentAttr = character.attributeManager.getByCode(
      skillSettings.parentAttrCode
    );
    const name = getLocalisedText(ctx.language, [
      'skill',
      skillSettings.code,
      'name',
    ]);
    const description = getLocalisedText(ctx.language, [
      'skill',
      skillSettings.code,
      'description',
    ]);
    let resolver;
    if (resolverClass) {
      resolver = new resolverClass({
        ctx,
        name,
        ...skillSettings,
      });
    }
    return new Skill({
      props: {
        ...skillSettings,
        name,
        description,
        exp: 0,
        parentAttr,
        skillManager,
        ...(resolver ? { resolver } : {}),
      },
      ctx,
    });
  };
}
