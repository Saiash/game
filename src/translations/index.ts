import { ruTexts } from './ru';
import { engTexts } from './en';

const texts = { ru: ruTexts, eng: engTexts };

export type locale = 'ru' | 'eng';

/*
path: skill -> lockpicking -> name
*/
export function getLocalisedText(locale: locale, path: string[]): string {
  if (path[0] === 'skill') {
    return getSkillText(locale, path);
  }
  return '';
}

function getSkillText(locale: locale, path: string[]): string {
  return texts[locale].skillTexts[path[1]][path[2]];
}
