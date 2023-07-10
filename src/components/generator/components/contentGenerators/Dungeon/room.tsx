import { Generator as defaultGenerator } from '..';
import { random } from 'lodash';
import { DefaultCombinedGenerator } from '../defaultCombinedGenerator';
import { generator as generatorType } from '../tables';
import { parseTextForDices } from '../../../../../core/utils/diceThrower';

const table: { [index: string]: { type: string; options?: string[] } } = {};
const GenName = 'Dungeon_Room';
const roomsTable = [
  ['Rectangular, dimensions 10d4 ft x 10d4 ft.', [1, 6]],
  ['Rectangular, dimensions 10d4 ft x 10d4 ft.', [1, 6]],
  ['Square, 10d4+1 ft. on all sides', [1, 4]],
  ['Square, 10d4+1 ft. on all sides', [1, 4]],
  ['Square 10d6+1 ft. on all sides', [1, 6]],
  ['Square 10d6+1 ft. on all sides', [1, 6]],
  ['Square, 10d8+1 ft. on all sides', [1, 8]],
  ['Square, 10d8+1 ft. on all sides', [1, 8]],
  ['Rectangle, 10d4+1 ft x 10d8+1 ft', [1, 6]],
  ['Rectangle, 10d4+1 ft x 10d8+1 ft', [1, 6]],
  ['Rectangle, 10d6+1 ft x 10d6+2 ft', [1, 6]],
  ['Rectangle, 10d6+1 ft x 10d6+2 ft', [1, 6]],
  ['Circular, 10d4 diameter', [1, 4]],
  ['Circular, 10d4 diameter', [1, 4]],
  [
    'Triangular, 10d6 down one side, other sides whatever shape fits best',
    [1, 4],
  ],
  ['Pentagonal, 10d4 ft. across', [0, 2]],
  ['Hexagonal, 10d6 ft. across', [0, 3]],
  ['Octagonal, 10d6 ft. across', [0, 3]],
  ['Trapezoidal, 10d6 ft roughly on each side'],
  ['Rough cave, 10d12 width (approx)'],
];

const roomContent = [
  'Level appropriate Deadly Encounter (see Chapter 16). Loot 45%, Clue 75%. Roll DMG Loot table appropriate to encounter.',
  'Remnants / proof of the boss or BBEG. It looks as though they have been up to mischief in this room.',
  'Low level minions of the BBEG in this room. Level appropriate easy encounter',
  'Dungeon Hazard. 1: sinkhole, 2: fungus, 3: trap, 4: collapsing masonry or other natural hazard, 5: wandering monster, medium difficulty, 6: Player’s choice.',
  'Dungeon Hazard. 1: sinkhole, 2: fungus, 3: trap, 4: collapsing masonry or other natural hazard, 5: wandering monster, medium difficulty, 6: Player’s choice.',
  'Level appropriate Hard Encounter (see Chapter 16). Clue, Loot, Random, SD all 30%',
  'Level appropriate Hard Encounter (see Chapter 16). Clue, Loot, Random, SD all 30%',
  'Level appropriate Hard Encounter (see Chapter 16). Clue, Loot, Random, SD all 30%',
  'NPC in room investigating. Roll again to find out what they are investigating',
  'A previously triggered trap is in this room, with a level appropriate Hard Encounter enemy caught in it / victim to it. Enemy alive, 30%. Loot 10%.',
  'Level appropriate Easy Encounter (see Chapter 16) Loot 20%, SD 10%, Clue 30%',
  'Level appropriate Easy Encounter (see Chapter 16) Loot 20%, SD 10%, Clue 30%',
  'Level appropriate Easy Encounter (see Chapter 16) Loot 20%, SD 10%, Clue 30%',
  'Obstacle of some sort (e.g. rubble, crevasse, sinkhole, underground stream, wild magic field). Athletics or acrobatics check might be required to pass it, or it might be impassable. (Alterntively, roll on Obstacles Table, DMG p.297)',
  'Level appropriate Medium Encounter (see Chapter 16) Loot 30%, SD 20%, Clue 30%',
  'Level appropriate Medium Encounter (see Chapter 16) Loot 30%, SD 20%, Clue 30%',
  'Level appropriate Medium Encounter (see Chapter 16) Loot 30%, SD 20%, Clue 30%',
  'NPC (enemy or ally of the PC) near death (1d4 levels less than you, minimum Level 1), unconscious, Level appropriate Hard Encounter. Enemy or enemies reduced to 50% hp. Loot 50%. A battle has obviously gone on here - the NPC has fought a powerful creature, and lost, but has damaged it somewhat.',
  'Two level appropriate ([d4] 1-2: Easy, 3-4: Medium) creatures are engaged in battle with each other. You stumble in just as battle starts. How do you react? Hide and wait until a victor emerges? What are they fighting over? Since they are otherwise engaged, you have advantage on stealth checks to creep up. (DC is the creature’s passive perception)',
  'Deserted but for some strange runes and symbols on the floor. Magical? Perhaps.',
  'Strong NPC (2d4 levels higher than your PC) has just defeated a Level Appropriate Deadly Encounter. Roll d4 to determine attitude. 1-2: They tell you to begone, they stake claim to this dungeon and all within it. Will fight if hallenged. However, also will agree to split zup and going seperate ways, perhaps 3-4: Will team up with you for the remainder of this dungeon, and split the loot, and then will depart. (CR of all encounters from here on increases by 1d4). Random, SD, Trap all 30% Roll on NPC table, skipping professions and going straight to classes. NPC level is determined above.',
  'Empty. Mission relevant loot chance 30%',
  'Accursed or blessed relic, guarded by level appropriate deadly encounter. Q/A rolls to determine nature of relic',
  'BOSS / BBEG / Significant NPC Encounter! (Use the details of your story so far, Q/A tables, or Story Element Interaction Tables to determine what). Loot 90%. Roll d20. 1-14: Roll 1d4 times on Individual Treasure Table. 15-20: Roll once on Hoard Table. (DMG pp. 136-139.)',
];

export const RoomGenerator = (fields: any) => {
  const roll = random(1, roomsTable.length) - 1;
  let exitsNumber = 1;
  let doorsNumber = 0;
  if (roomsTable[roll][1]) {
    exitsNumber = random(
      roomsTable[roll][1][0] as number,
      roomsTable[roll][1][1] as number
    );
    if (exitsNumber === 0) exitsNumber = 1;
    for (let i = 0; i < exitsNumber; i++) {
      if (random(1, 100) < 50) {
        doorsNumber++;
      }
    }
  }
  const content = roomContent[random(1, roomContent.length) - 1];
  return (
    parseTextForDices(roomsTable[roll][0] as string) +
    ', ' +
    content +
    '. Exits: ' +
    exitsNumber +
    ', doors: ' +
    doorsNumber
  );
};

export const Room = ({
  writeToLog,
}: {
  writeToLog: (result: string) => void;
}) => {
  return DefaultCombinedGenerator({
    table,
    GenName,
    generator: RoomGenerator,
    writeToLog,
  });
};
