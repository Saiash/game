import { random } from 'lodash';
import { DefaultCombinedGenerator } from '../defaultCombinedGenerator';

const table: { [index: string]: { type: string; options?: string[] } } = {
  population: { type: 'select', options: ['low', 'medium', 'high'] },
};
const GenName = 'Unmarked_Settlement';
const settlementType = [
  'Large Camp (1-20)',
  'Cottage (1 - 10)',
  'Encampment (50 - 100)',
  'Hamlet (50 - 150)',
  'Workcrew (50 - 200)',
  'Garrison (100 - 300)',
  'Fort (200 - 400)',
  'Village (300 - 1000)',
  'Army (1000 - 3000)',
  'Refuggee camp ( up to 5000)',
];

const generator = (fields: any) => {
  const [[population]] = fields;
  const totalDices = random(1, 4) - 1;
  const border = population === 'low' ? 5 : population === 'medium' ? 10 : 20;
  const result: string[] = [];
  for (let i = 0; i < totalDices; i++) {
    const roll = random(1, 100);
    if (roll <= border) {
      const roll = random(1, 10);
      let type = settlementType[roll - 1];
      if (roll === 1) {
        const roll = random(1, 4);
        if (roll === 1) {
          type = type + ' abandoned';
        }
      }
      result.push(type);
    }
  }
  return 'Settlements: ' + (result.join(', ') || '0');
};

export const UnmarkedSettlement = ({
  writeToLog,
}: {
  writeToLog: (result: string) => void;
}) => {
  return DefaultCombinedGenerator({ table, GenName, generator, writeToLog });
};
