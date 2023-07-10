import { Generator as defaultGenerator } from '..';
import { random } from 'lodash';
import { DefaultCombinedGenerator } from '../defaultCombinedGenerator';
import { generator as generatorType } from '../tables';

const table: { [index: string]: { type: string; options?: string[] } } = {};
const GenName = 'Dungeon_Passages';
const trapType = [
  'Poison darts',
  'Collapsing Roof',
  'Simple Pit',
  'Hidden pit',
  'Locking pit',
  'Spiked pit',
  'Rolling sphere',
  'Scything blade',
  'Glyph trap',
  'Magic missile spell',
  'Poison gas released',
  'Room fills with water',
  'Walls begin closing',
  'Spears come out of floor',
  'Spiked grate drops',
  'Trapdoor (snakes / acid below?)',
  'Rope bindings',
  'Iron bindings',
  'Leather bindings',
  'Magic bindings',
  'Tripwire',
  'Whipping Tree',
  'Fey illusion',
  'Net trap',
];

export const TrapGenerator = (fields: any) => {
  const roll = random(1, trapType.length) - 1;
  const trap = trapType[roll];
  return trap;
};

export const Trap = ({
  writeToLog,
}: {
  writeToLog: (result: string) => void;
}) => {
  return DefaultCombinedGenerator({
    table,
    GenName,
    generator: TrapGenerator,
    writeToLog,
  });
};
