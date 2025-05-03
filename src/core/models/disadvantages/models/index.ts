import { createDisadvantageF } from '..';
import { getLocalisedText } from '../../../../translations';
import { Disadvantage, rawDisadvantageModel } from '../disadvantage';

export type disadvantageFabricType = Omit<
  rawDisadvantageModel,
  'name' | 'description' | 'level'
>;

export function disadvantageFabric(
  disadvantageSettings: disadvantageFabricType
): createDisadvantageF {
  return ({ ctx, level }) => {
    const name = getLocalisedText(ctx.language, [
      'disadvantage',
      disadvantageSettings.code,
      'name',
    ]);
    const description = getLocalisedText(ctx.language, [
      'disadvantage',
      disadvantageSettings.code,
      'description',
    ]);
    return new Disadvantage({
      data: {
        ...disadvantageSettings,
        level: level || 0,
        name,
        description,
      },
      ctx,
    });
  };
}
