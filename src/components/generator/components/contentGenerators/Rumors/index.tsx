import { random } from 'lodash';
import { DefaultCombinedGenerator } from '../defaultCombinedGenerator';

const table: { [index: string]: { type: string; options?: string[] } } = {};
const GenName = 'Rumors';
const subject = ['Person', 'Creature', 'Place', 'Thing'];
const rumorPlace = [
  'In this settlement/area',
  'Just outside settlement',
  'In the nearest forest',
  'In the nearest hills',
  'In the nearest mountains',
  'In the nearest swamp',
  'In/beside the nearest body of water',
  'In the next village',
  'In the next large town',
  'In the capital of the realm',
  'In the next realm',
  '1d4 miles away, in a structure (TODO)',
];

export const rumorGenerator = (fields: any) => {
  return `${subject[random(1, subject.length) - 1]} ${
    rumorPlace[random(1, rumorPlace.length) - 1]
  }`;
};

export const Rumors = ({
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
