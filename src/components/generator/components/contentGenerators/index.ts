import { random } from 'lodash';
import { generator } from './tables';

export function Generator(generator: generator): string {
  const { diceSides, table, mod = 0 } = generator;
  const randVal = random(1, diceSides) + mod;
  const keys = Object.keys(table);
  for (const value of keys) {
    const borderValue = parseInt(value);
    if (randVal <= borderValue) return table[borderValue];
  }
  return 'Unknown';
}
