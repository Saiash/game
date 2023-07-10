import { random } from 'lodash';

export const throwDices = (
  dices: number,
  edges: number,
  mod: string = '0'
): number => {
  const results: number[] = [];
  for (let i = 0; i < dices; i++) {
    results.push(random(1, edges) + parseInt(mod));
  }
  return results.reduce((acc, val) => acc + val, 0);
};

export const parseTextForDices = (text: string): string => {
  return text.replace(
    /(\d\d|\d)d(\d\d|\d)(-\d|\+\d)?/g,
    (match, dices, edges, mod) => {
      return throwDices(dices, edges, mod) + '';
    }
  );
};
