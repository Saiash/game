import { Generator as defaultGenerator } from '..';
import { random } from 'lodash';
import { DefaultCombinedGenerator } from '../defaultCombinedGenerator';
import { generator as generatorType } from '../tables';
import { DoorGenerator } from './door';

const table: { [index: string]: { type: string; options?: string[] } } = {};
const GenName = 'Dungeon_Passages';
const passageType = [
  { text: 'Passage continues d4 x 10 ft.' },
  { text: 'Passage goes 15 ft and ends at door', followUp: 'door' },
  { text: 'Passage goes 30 ft and ends in stairs', followUp: 'stair' },
  { text: 'Passage turns left 90 degrees' },
  { text: 'Passage turns right 90 degrees' },
  { text: 'Passage dead ends', followUp: 'secretDoor' },
  { text: 'Passage dead ends' },
  {
    text: 'Passage continues 1d4 x 10 ft and comes to a four way intersection',
  },
  { text: 'Passage continues d4 x 10 ft and comes to a T-junction' },
  {
    text: 'Passage continues d6 x 10 ft and then you see a side passage leading off to the left',
  },
  {
    text: 'Passage continues d6 x 10 ft and then you see a side passage leading off to the right',
  },
  { text: 'Passage ends in an open entrance to a room', followUp: 'room' },
  { text: 'Door in right wall', followUp: 'door' },
  { text: 'Door in left wall', followUp: 'door' },
  { text: 'Secret door on passage wall', followUp: 'secretDoor' },
  { text: 'Passage narrows (1d6 ÷ 2) x 10 ft. (minimum width 5 ft)' },
  { text: 'Passage widens (1d6 ÷ 2) x 10 ft. (minimum width 10 ft)' },
  { text: 'Opening to the left, stairs', followUp: 'stair' },
  { text: 'Opening to the left, right', followUp: 'stair' },
  { text: 'Opening to the left, floor', followUp: 'passage' },
  { text: 'Opening to the left, floor', followUp: 'room' },
  { text: 'Roll on Random architecture table', followUp: 'architecture' },
];

export const passageContent = [
  { value: 69, text: 'Empty' },
  {
    value: 80,
    text: 'Empty apart from rubble. Clue 10%. Perception check DC 10 to find.',
    followUp: [{ type: 'clue', chance: 20 }],
  },
  {
    value: 84,
    text: 'Empty apart from corpse. Clue on body 20%.',
    followUp: [{ type: 'clue', chance: 20 }],
  },
  {
    value: 88,
    text: 'Empty apart from multiple corpses. Clue on a body 40%',
    followUp: [{ type: 'clue', chance: 40 }],
  },
  {
    value: 90,
    text: 'Empty apart from enemies. 1 level-appropriate easy encounter. Loot 15%, Clue 15%',
    followUp: [
      { type: 'clue', chance: 15 },
      { type: 'loot', chance: 15 },
    ],
  },
  {
    value: 92,
    text: 'Empty apart from enemies. 1 level-appropriate medium encounter. Loot 25%, Clue 25%',
    followUp: [
      { type: 'clue', chance: 25 },
      { type: 'loot', chance: 25 },
    ],
  },
  {
    value: 94,
    text: 'Empty apart from enemies. 1 level-appropriate hard encounter. Loot 50%, clue 50%',
    followUp: [
      { type: 'clue', chance: 50 },
      { type: 'loot', chance: 50 },
    ],
  },
  {
    value: 98,
    text: 'Trap! Go straight to Trap Table.',
    followUp: [{ type: 'trap' }],
  },
  {
    value: 100,
    text: 'Loot 60%. Roll DMG individual treasure: Challenge 0-4 table. Add 30 to roll. How did this loot get here? ',
    followUp: [{ type: 'loot', chance: 60, mod: 30 }],
  },
];

export const PassageGenerator = (fields: any) => {
  const rooms: string[] = [];
  const roll = random(1, passageType.length) - 1;
  const rollContent = random(1, 100);
  const [rolledContent] = passageContent.filter(
    entity => rollContent <= entity.value
  );
  const passage = passageType[roll];
  rooms.push(passage.text + ', ' + rolledContent.text);
  if (passage.followUp) {
    if (passage.followUp === 'passage') rooms.push(PassageGenerator(''));
    if (passage.followUp === 'door') rooms.push(DoorGenerator(''));
  }
  return rooms.join(', ');
};

export const Passage = ({
  writeToLog,
}: {
  writeToLog: (result: string) => void;
}) => {
  return DefaultCombinedGenerator({
    table,
    GenName,
    generator: PassageGenerator,
    writeToLog,
  });
};
