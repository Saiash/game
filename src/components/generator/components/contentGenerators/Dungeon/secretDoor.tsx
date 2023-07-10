import { Generator as defaultGenerator } from '..';
import { random } from 'lodash';
import { DefaultCombinedGenerator } from '../defaultCombinedGenerator';
import { generator as generatorType } from '../tables';

const table: { [index: string]: { type: string; options?: string[] } } = {};
const GenName = 'Dungeon_Secret_Doors';
const doorsTable = [
  'Secret door opens into a room. +40 to Room Contents table roll.',
  'Secret door opens onto passage. Roll passage table, + 40 to Passage Contents roll.',
  'Trapped secret door. Roll on trap table, then on (d4) 1-2: Passage, 3-4: Room. Add 50 to your Passage Contents or Room Contents roll.',
];

export const SecretDoorGenerator = (fields: any) => {
  const roll = random(1, doorsTable.length) - 1;
  return doorsTable[roll];
};

export const SecretDoor = ({
  writeToLog,
}: {
  writeToLog: (result: string) => void;
}) => {
  return DefaultCombinedGenerator({
    table,
    GenName,
    generator: SecretDoorGenerator,
    writeToLog,
  });
};
