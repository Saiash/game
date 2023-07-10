import { Generator as defaultGenerator } from '..';
import { random } from 'lodash';
import { DefaultCombinedGenerator } from '../defaultCombinedGenerator';
import { generator as generatorType } from '../tables';

const table: {
  [index: string]: { type: string; options?: string[]; default?: string };
} = {
  difficulty: {
    type: 'select',
    default: 'Possible',
    options: [
      'impossible',
      'Highly Unlikely',
      'Unlikely',
      'Possible',
      'Likely',
      'Highly Likely',
      'Certainty',
    ],
  },
};

const oracleGen: generatorType = {
  table: {
    2: 'No, and',
    7: 'No',
    9: 'No, but',
    10: 'Maybe',
    12: 'Yes, but',
    18: 'Yes',
    20: 'Yes, and',
  },
  diceSides: 20,
};
const GenName = 'Oracle';

const generator = (fields: any) => {
  const [[difficulty]] = fields;
  const mod = table.difficulty.options?.indexOf(difficulty) || 0;
  const roll = random(1, 20);
  //const result = roll - 6 + 2 * mod;
  //return result <= 6 ? 'No' : result <= 12 ? 'Maybe' : 'Yes';
  return defaultGenerator(oracleGen);
};

export const Oracle = ({
  writeToLog,
}: {
  writeToLog: (result: string) => void;
}) => {
  return DefaultCombinedGenerator({ table, GenName, generator, writeToLog });
};
