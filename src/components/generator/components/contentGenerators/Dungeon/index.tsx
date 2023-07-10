import { Generator as defaultGenerator } from '..';
import { random } from 'lodash';
import { DefaultCombinedGenerator } from '../defaultCombinedGenerator';
import { generator as generatorType } from '../tables';

const table: { [index: string]: { type: string; options?: string[] } } = {};
const GenName = 'Dungeon';
const dungeonType = [
  'Lair',
  'Tomb / Crypt',
  'Abandoned stronghold',
  'Temple or shrine',
  'Natural caves',
  'Maze',
  'Mine',
  'Planar Gate',
  'Guild / cult headquarters',
  'Death Trap',
];

export const rumorGenerator = (fields: any) => {
  return `${
    dungeonType[random(1, dungeonType.length) - 1]
  } of ${sizeGenerator()} rooms`;
};

const sizeGenerator = () => {
  const initRoll = random(1, 20);
  if (initRoll <= 3) return random(1, 4) + 2;
  if (initRoll <= 8) return random(1, 6) + 4;
  if (initRoll <= 16) return random(4, 16) + 6;
  if (initRoll <= 18) return random(5, 30) + 12;
  if (initRoll <= 19) return random(10, 60) + 24;
  if (initRoll <= 20) return 1000;
};

export const Dungeon = ({
  writeToLog,
}: {
  writeToLog: (result: string) => void;
}) => {
  return DefaultCombinedGenerator({
    table,
    GenName,
    generator: rumorGenerator,
    writeToLog,
  });
};
