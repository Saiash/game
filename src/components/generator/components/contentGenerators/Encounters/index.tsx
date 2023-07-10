import { random } from 'lodash';
import { DefaultCombinedGenerator } from '../defaultCombinedGenerator';
import {
  Wild_Encounters_Table,
  randomWildEncountersTable,
} from './tables/wildEncountersTable';

const table: { [index: string]: { type: string; options?: string[] } } = {
  hours: { type: 'number' },
  population: { type: 'select', options: ['low', 'medium', 'high'] },
  time: { type: 'select', options: ['day', 'night'] },
};
const GenName = 'Wild_Encounters';

const generator = (fields: any) => {
  const [[hours], [population], [time]] = fields;
  if (typeof hours !== 'string') return 'Unknown';
  const _hours = parseInt(hours);
  const mod = time === 'day' ? 2 : 1;
  const dices =
    (population === 'low' ? 1 : population === 'medium' ? 2 : 3) * mod;
  const hoursForDice = 12 / dices;
  const totalDices = Math.floor(_hours / hoursForDice);
  let result: string[] = [];
  for (let i = 0; i < totalDices; i++) {
    const roll = random(1, 4);
    if (roll === 1) {
      const typeOfencounter = random(1, 2);
      let table = Wild_Encounters_Table;
      if (typeOfencounter === 1) {
        table = randomWildEncountersTable;
      }
      result.push(table[random(1, table.length) - 1]);
    }
  }
  return 'Encounters: ' + result.join(';\n\n');
};

export const WildEncounters = ({
  writeToLog,
}: {
  writeToLog: (result: string) => void;
}) => {
  return DefaultCombinedGenerator({ table, GenName, generator, writeToLog });
};
