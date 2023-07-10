import { random } from 'lodash';
import { DefaultCombinedGenerator } from '../defaultCombinedGenerator';

const creaturesTable = [
  'Monster!',
  'Bear',
  'Cat',
  'Dire Wolf',
  'Dog',
  'Draft Horse',
  'Eagle',
  'Elephant',
  'Elk',
  'Flying Snake',
  'Ape',
  'Giant Ape',
  'Giant Badger',
  'Giant Boar',
  'Giant Eagle',
  'Giant Elk',
  'Giant Fire Beetle',
  'Giant Frog',
  'Giant Lizard',
  'Giant Owl',
  'Giant Rat',
  'Giant Spider',
  'Goat',
  'Hawk',
  'Mastiff',
  'Mule',
  'Owl',
  'Riding Horse',
  'Panther',
  'Poisonous Snake',
  'Pony',
  'Rat',
  'Raven',
  'Swarm of Insects',
  'Swarm of rats',
  'Swarm of ravens',
  'Vulture',
  'Weasel',
  'Wolf',
];

const table: { [index: string]: { type: string; options?: string[] } } = {};
const GenName = 'Creatures';

export const CreaturesGenerator = (fields: any) => {
  const roll = random(1, creaturesTable.length) - 1;
  return creaturesTable[roll];
};

export const Creatures = ({
  writeToLog,
}: {
  writeToLog: (result: string) => void;
}) => {
  return DefaultCombinedGenerator({
    table,
    GenName,
    generator: CreaturesGenerator,
    writeToLog,
  });
};
