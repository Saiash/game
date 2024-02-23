import { Race } from '..';
import { getLocalisedText } from '../../../../../translations';
import { CTX, PartialRecord } from '../../../../../types';
import { perkList } from '../../../perks';
import { attrsCodesList } from '../../attributes';
import { secondaryAttrsCodesList } from '../../secondaryAttributes';
import { Dragon } from './dragon';
import { Dwarf } from './dwarf';
import { Felinoid } from './felinoid';

export type raceSettingsRaw = {
  attributes: PartialRecord<attrsCodesList, number>;
  secondaryAttributes: PartialRecord<secondaryAttrsCodesList, number>;
  perk: PartialRecord<perkList, number>;
  name: string;
  code: reacesList;
  description: string;
};

export type reacesList = 'dragon' | 'dwarf' | 'felinoid';

export type createRaceF = ({ ctx }: { ctx: CTX }) => Race;

export const RACE_LIST: Record<reacesList, createRaceF> = {
  dragon: Dragon,
  dwarf: Dwarf,
  felinoid: Felinoid,
};

export type raceFabricType = Omit<raceSettingsRaw, 'name' | 'description'>;

export function raceFabric({
  raceSettings,
  raceClass,
}: {
  raceSettings: raceFabricType;
  raceClass?: typeof Race;
}): createRaceF {
  return ({ ctx }) => {
    const name = getLocalisedText(ctx.language, [
      'race',
      raceSettings.code,
      'name',
    ]);
    const description = getLocalisedText(ctx.language, [
      'race',
      raceSettings.code,
      'description',
    ]);
    const _class = raceClass || Race;
    return new _class(
      {
        ...raceSettings,
        name,
        description,
      },
      ctx
    );
  };
}
