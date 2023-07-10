import { Generator as defaultGenerator } from '..';
import { random } from 'lodash';
import { DefaultCombinedGenerator } from '../defaultCombinedGenerator';
import { generator as generatorType } from '../tables';
import { NPCGenerator } from '../NPC';

const table: { [index: string]: { type: string; options?: string[] } } = {};
const GenName = 'Tavern';
const names = [
  [
    'The Glided',
    'The Frog and',
    'The Hammer and',
    'The Golden',
    'The Black',
    'Eye of the',
    'The sword and',
    'The filthy',
    'The Evil',
    'The Good',
    'The Stroppy',
    'The Greasy',
    'The Naughty',
    'The Queen and',
    'The leper and',
    'The Dog and',
    'The Sweaty',
    'The Blessed',
    'The Cunning',
    'The Naked',
    'The Knight`s',
    'The Bound',
  ],
  [
    'Anvil',
    'Eye',
    'Rogue',
    'Assasin',
    'Dagger',
    'Quipper',
    'Spadger',
    'King',
    'Wizard',
    'Toad',
    'Bullock',
    'Bollock',
    'Bullcock',
    'Buttock',
    'Cuckold',
    'Sabre',
    'Strumpet',
    'Nonce',
    'Scoundrel',
    'Knave',
    'Cock',
    'Slave',
  ],
];

const rooms: generatorType = {
  table: {
    1: 'no',
    2: '1',
    3: '2',
    4: '3',
    5: '4',
    6: '5',
    7: '6',
    8: '8',
    9: '10',
    10: '20',
  },
  diceSides: 10,
};

const quality: generatorType = {
  table: {
    1: 'Atrocious',
    3: 'Poor',
    6: 'Average',
    8: 'Good',
    9: 'Excellent',
    10: 'Outstanding',
  },
  diceSides: 10,
};

const customerService: generatorType = {
  table: {
    1: 'Unfriendly',
    3: 'Neutral',
    5: 'Civil',
    7: 'Cordial',
    9: 'Warm and welcoming',
    10: 'Friendly',
  },
  diceSides: 10,
};

const rumors: generatorType = {
  table: {
    1: 'no',
    3: '1',
    6: '2',
    8: '3',
    10: '4',
  },
  diceSides: 10,
};

const generator = (fields: any) => {
  const name1 = random(1, names[0].length) - 1;
  const name2 = random(1, names[1].length) - 1;
  const name = names[0][name1] + ' ' + names[1][name2];
  const _rooms = defaultGenerator(rooms);
  const _quality = defaultGenerator(quality);
  const service = defaultGenerator(customerService);
  const owner = NPCGenerator('');
  const rumorsCount = defaultGenerator(rumors);
  return `${_quality} ${service} "${name}", ${_rooms} rooms. Owner: ${owner}, up to ${rumorsCount} rumors.`;
};

export const Tavern = ({
  writeToLog,
}: {
  writeToLog: (result: string) => void;
}) => {
  return DefaultCombinedGenerator({ table, GenName, generator, writeToLog });
};
