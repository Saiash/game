import { random } from 'lodash';
import { DefaultCombinedGenerator } from '../defaultCombinedGenerator';
import {
  Settlement_Encounters_Table,
  settlementRandomEcndountersTable,
} from './tables/settlementEncountersTable';

const table: { [index: string]: { type: string; options?: string[] } } = {
  hours: { type: 'number' },
  settlement: {
    type: 'select',
    options: ['Encampment', 'Hamlet', 'Village', 'Town', 'City', 'Metropolis'],
  },
  time: { type: 'select', options: ['day', 'night'] },
};
const GenName = 'Settlement_Encounters';

const generator = (fields: any) => {
  const [[hours], [settlement], [time]] = fields;
  if (typeof hours !== 'string') return 'Unknown';
  const _hours = parseInt(hours);
  const mod = time === 'day' ? 2 : 1;
  const settlementSize = table.settlement.options?.indexOf(settlement) || 0;
  const dices = (settlementSize === 0 ? 1 : settlementSize) * mod;
  const hoursForDice = 12 / dices;
  const totalDices = Math.floor(_hours / hoursForDice);
  let result: string[] = [];
  for (let i = 0; i < totalDices; i++) {
    const roll = random(1, 4);
    if (roll === 1) {
      const typeOfencounter = random(1, 2);
      let table = Settlement_Encounters_Table;
      if (typeOfencounter === 1) {
        table = settlementRandomEcndountersTable;
      }
      result.push(table[random(1, table.length) - 1]);
    }
  }
  return 'Encounters: ' + result.join(';\n\n');
};

export const SettlementEncounters = ({
  writeToLog,
}: {
  writeToLog: (result: string) => void;
}) => {
  return DefaultCombinedGenerator({ table, GenName, generator, writeToLog });
};
