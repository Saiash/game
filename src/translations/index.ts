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
  disadvantage: 'disadvantageTexts',
  modification: 'modificationsTexts',
  node: 'nodeTexts',
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
  | 'node'
  | 'disadvantage'
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
  | 'nodeTexts'
  | 'disadvantageTexts'
  | 'modificationsTexts';

type path = [entityName, string, string];

export function getLocalisedText(locale: locale, path: path): string {
  const text = texts[locale][languageResolvers[path[0]]][path[1]][path[2]];
  if (!text) return '';
  return typeof text === 'string' ? text : text.join('\r\n');
}
