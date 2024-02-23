import { SpellManager } from '../spellManager';
import { getLocalisedText } from '../../../../translations';
import { CTX, PartialRecord } from '../../../../types';
import { Spell } from '../spell';
import { PurifyAir } from './purifyAir';

export type spellList = 'purifyAir';

export type spellType =
  | 'regular'
  | 'area'
  | 'melee'
  | 'missile'
  | 'blocking'
  | 'information'
  | 'resisted'
  | 'special';
export type spellSchool = 'air' | 'fire';

export type rawSpellModel = {
  code: spellList;
  name: string;
  type: spellType;
  description: string;
  exp: number;
  school: spellSchool;
  energy: number;
  requirments: { spells?: PartialRecord<spellList, number>; magery?: number };
};

export type createSpellF = ({
  ctx,
  spellManager,
  exp,
}: {
  ctx: CTX;
  spellManager: SpellManager;
  exp?: number;
}) => Spell;

export const SPELL_LIST: Record<spellList, createSpellF> = {
  purifyAir: PurifyAir,
};

export type spellFabricType = Omit<
  rawSpellModel,
  'name' | 'description' | 'exp'
>;

export function spellFabric({
  spellSettings,
  spellClass,
}: {
  spellSettings: spellFabricType;
  spellClass?: typeof Spell;
}): createSpellF {
  return ({ ctx, spellManager, exp }) => {
    const name = getLocalisedText(ctx.language, [
      'spell',
      spellSettings.code,
      'name',
    ]);
    const description = getLocalisedText(ctx.language, [
      'spell',
      spellSettings.code,
      'description',
    ]);
    const _class = spellClass || Spell;
    return new _class(
      {
        ...spellSettings,
        name,
        description,
        exp: exp || 0,
      },
      ctx,
      spellManager
    );
  };
}
