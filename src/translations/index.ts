import { ruTexts } from './ru';
import { engTexts } from './en';

const texts = { ru: ruTexts, eng: engTexts };

export type locale = 'ru' | 'eng';

/*
path: skill -> lockpicking -> name
*/
const languageResolvers: Record<entityName, entityType> = {
  skill: 'skillTexts',
  race: 'raceTexts',
  perk: 'perkTexts',
  spell: 'spellTexts',
  general: 'generalTexts',
  weapon: 'weaponTexts',
  modification: 'modificationsTexts',
};

type entityName =
  | 'skill'
  | 'race'
  | 'perk'
  | 'spell'
  | 'general'
  | 'weapon'
  | 'modification';

type entityType =
  | 'skillTexts'
  | 'raceTexts'
  | 'perkTexts'
  | 'spellTexts'
  | 'generalTexts'
  | 'weaponTexts'
  | 'modificationsTexts';

type path = [entityName, string, string];

export function getLocalisedText(locale: locale, path: path): string {
  return texts[locale][languageResolvers[path[0]]][path[1]][path[2]];
}
