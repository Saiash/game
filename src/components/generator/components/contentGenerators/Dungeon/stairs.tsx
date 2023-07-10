import { Generator as defaultGenerator } from '..';
import { random } from 'lodash';
import { DefaultCombinedGenerator } from '../defaultCombinedGenerator';
import { generator as generatorType } from '../tables';

const table: { [index: string]: { type: string; options?: string[] } } = {};
const GenName = 'Dungeon_Stairs';
const stairsTable = [
  'Down one level to a (d4) 1-2: Room, 3-4: Passage',
  'Down one level to a (d4) 1-2: Room, 3-4: Passage',
  'Down one level to a (d4) 1-2: Room, 3-4: Passage',
  'Down one level to a (d4) 1-2: Room, 3-4: Passage',
  'Down one level to a (d4) 1-2: Room, 3-4: Passage',
  'Down one level to a (d4) 1-2: Room, 3-4: Passage',
  'Down one level to a (d4) 1-2: Room, 3-4: Passage',
  'Down one level to a (d4) 1-2: Room, 3-4: Passage',
  'Down one level to a room, add 15 to Room Contents roll',
  'Down one level to a room, add 30 to Room Contents roll',
  'Down one level to a passage',
  'Down one level to a passage, add 15 to Passage Contents roll',
  'Down one level to a passage, add 30 to Passage Contents roll',
  'Down two levels to a (d4) 1-2: Passage, 3-4: Room',
  'Up one level to a room, add 15 to your Room Contents roll',
  'Up one level to a room, add 30 to your Room Contents roll',
  'Up one level to a passage',
  'Up one level to a passage, add 15 to Passage Contents roll',
  'Up one level to a passage, add 15 to Passage Contents roll',
  'Up two levels to a (d4) 1-2: Passage, 3-4: Room',
];

export const DoorGenerator = (fields: any) => {
  const roll = random(1, stairsTable.length) - 1;
  return stairsTable[roll];
};

export const Door = ({
  writeToLog,
}: {
  writeToLog: (result: string) => void;
}) => {
  return DefaultCombinedGenerator({
    table,
    GenName,
    generator: DoorGenerator,
    writeToLog,
  });
};
