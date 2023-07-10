import { random } from 'lodash';
import { DefaultCombinedGenerator } from '../defaultCombinedGenerator';

const table: {
  [index: string]: { type: string; options?: string[]; default?: string };
} = {};
const GenName = 'Dice';

const generator = (fields: any) => {
  return random(1, 6) + random(1, 6) + random(1, 6) + '';
};

export const Dice = ({
  writeToLog,
}: {
  writeToLog: (result: string) => void;
}) => {
  return DefaultCombinedGenerator({ table, GenName, generator, writeToLog });
};
