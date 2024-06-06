import { ruTexts } from './ru';
import { engTexts } from './en';

const texts = { ru: ruTexts, eng: engTexts };

export type locale = 'ru' | 'eng';

/*
path: skill -> lockpicking -> name
*/
const languageResolvers: Record<entityName, entityType> = {
  shield: 'shieldTexts',
  skill: 'skillTexts',
  race: 'raceTexts',
  perk: 'perkTexts',
  spell: 'spellTexts',
  general: 'generalTexts',
  weapon: 'weaponTexts',
  ammo: 'ammoTexts',
  armor: 'armorTexts',
  modification: 'modificationsTexts',
};

type entityName =
  | 'shield'
  | 'skill'
  | 'race'
  | 'perk'
  | 'spell'
  | 'general'
  | 'weapon'
  | 'ammo'
  | 'armor'
  | 'modification';

type entityType =
  | 'shieldTexts'
  | 'skillTexts'
  | 'raceTexts'
  | 'perkTexts'
  | 'spellTexts'
  | 'generalTexts'
  | 'weaponTexts'
  | 'ammoTexts'
  | 'armorTexts'
  | 'modificationsTexts';

type path = [entityName, string, string];

export function getLocalisedText(locale: locale, path: path): string {
  return texts[locale][languageResolvers[path[0]]][path[1]][path[2]];
}
