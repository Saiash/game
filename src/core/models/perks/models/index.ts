import { createPerkF } from '..';
import { getLocalisedText } from '../../../../translations';
import { Perk, rawPerkModel } from '../perk';

export type perkFabricType = Omit<
  rawPerkModel,
  'name' | 'description' | 'level'
>;

export function perkFabric(perkSettings: perkFabricType): createPerkF {
  return ({ ctx, level }) => {
    const name = getLocalisedText(ctx.language, [
      'perk',
      perkSettings.code,
      'name',
    ]);
    const description = getLocalisedText(ctx.language, [
      'perk',
      perkSettings.code,
      'description',
    ]);
    return new Perk({
      data: {
        ...perkSettings,
        level: level || 0,
        name,
        description,
      },
      ctx,
    });
  };
}
