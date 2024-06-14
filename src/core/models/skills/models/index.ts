import { createSkillF } from '..';
import { getLocalisedText } from '../../../../translations';
import { Skill } from '../skill';
import { SkillResolver } from '../resolvers';
import { SkillInputProps } from '../types';

export type skillFabricType = Omit<SkillInputProps, 'name' | 'description'>;

export function skillFabric({
  skillSettings,
  resolverClass,
  skillClass,
}: {
  skillSettings: skillFabricType;
  resolverClass?: typeof SkillResolver;
  skillClass?: typeof Skill;
}): createSkillF {
  return ({ ctx, character, skillManager, exp }) => {
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
    const _class = skillClass || Skill;
    return new _class({
      props: {
        ...skillSettings,
        name,
        description,
        exp: exp || 0,
        parentAttr,
        skillManager,
        ...(resolver ? { resolver } : {}),
      },
      ctx,
    });
  };
}
