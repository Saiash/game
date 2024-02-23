import { ruTexts } from './ru';
import { engTexts } from './en';

const texts = { ru: ruTexts, eng: engTexts };

export type locale = 'ru' | 'eng';

/*
path: skill -> lockpicking -> name
*/
const languageResolvers: {
  [index: string]: (cale: locale, path: string[]) => string;
} = {
  skill: getSkillText,
  perk: getPerkText,
  spell: getSpellText,
};

export function getLocalisedText(locale: locale, path: string[]): string {
  return languageResolvers[path[0]](locale, path);
}

function getSkillText(locale: locale, path: string[]): string {
  return texts[locale].skillTexts[path[1]][path[2]];
}

function getPerkText(locale: locale, path: string[]): string {
  return texts[locale].perkTexts[path[1]][path[2]];
}

function getSpellText(locale: locale, path: string[]): string {
  return texts[locale].perkTexts[path[1]][path[2]];
}
