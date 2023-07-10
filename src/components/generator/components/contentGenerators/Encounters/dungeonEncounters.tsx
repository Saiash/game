import { random } from 'lodash';
import { DefaultCombinedGenerator } from '../defaultCombinedGenerator';
import {
  Dungeon_Encounters_Table,
  dungeonRandomEncountersTable,
} from './tables/dungeonEncountersTable';

const table: { [index: string]: { type: string; options?: string[] } } = {
  hours: { type: 'number' },
  activity: {
    type: 'select',
    options: [
      'Deathly quiet',
      'Quiet',
      'Fairly Quiet',
      'Active',
      'Busy',
      'Insane',
    ],
  },
};
const GenName = 'Dungeon_Encounters';

const generator = (fields: any) => {
  const [[hours], [activity]] = fields;
  if (typeof hours !== 'string') return 'Unknown';
  const _hours = parseInt(hours);
  const dungeonActivity = table.activity.options?.indexOf(activity) || 0;
  const dices = dungeonActivity + 1;
  const totalDices = dices * _hours;
  let result: string[] = [];
  for (let i = 0; i < totalDices; i++) {
    const roll = random(1, 4);
    if (roll === 1) {
      const typeOfencounter = random(1, 2);
      let table = Dungeon_Encounters_Table;
      if (typeOfencounter === 1) {
        table = dungeonRandomEncountersTable;
      }
      result.push(table[random(1, table.length) - 1]);
    }
  }
  return 'Encounters: ' + result.join(';\n\n');
};

export const DungeonEncounters = ({
  writeToLog,
}: {
  writeToLog: (result: string) => void;
}) => {
  return DefaultCombinedGenerator({ table, GenName, generator, writeToLog });
};
