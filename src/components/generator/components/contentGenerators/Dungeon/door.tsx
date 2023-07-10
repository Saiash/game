import { Generator as defaultGenerator } from '..';
import { random } from 'lodash';
import { DefaultCombinedGenerator } from '../defaultCombinedGenerator';
import { generator as generatorType } from '../tables';

const table: { [index: string]: { type: string; options?: string[] } } = {};
const GenName = 'Dungeon_Doors';
const doorsTable = [
  'Standard wooden door, braced with metal, unlocked. Opens onto (roll d4) 1: Passage, 2: Stairs, 3-4: Room.',
  'Standard wooden door, braced with metal, unlocked. Opens onto (roll d4) 1: Passage, 2: Stairs, 3-4: Room.',
  'Standard wooden door, braced with metal, unlocked. Opens onto (roll d4) 1: Passage, 2: Stairs, 3-4: Room.',
  'Standard wooden door, braced with metal, unlocked. Opens onto (roll d4) 1: Passage, 2: Stairs, 3-4: Room.',
  'Iron bars (portcullis) with lever to the side. You can see through to the roome. Pulling the lever will raise the portcullis if unlocked (roll d4 to determine: 1-2 locked, 3-4 unlocked). DC 14 thieves’ tools check to unlock, DC 19 strength check to wrench open. Is the lever trapped? Use Q/A and investigation rolls.',
  'Empty doorway. Perhaps a magic glyph trap, triggering an attack spell (Fire Bolt or other). Make a Q/A roll with the modifier Unlikely (-2) to determine. Beyond doorway is either (d4) 1: Passage, 2: Stairs, 3-4: Room.',
  'Wooden door, locked. DC 15 thieves’ tools check, or it will have to be smashed. (or other valid method, such as Knock spell). Door has AC 12 and 20 hp. Opens into a room.',
  'Iron door, locked. DC 14 thieves’ tools check (or other valid method, such as Knock spell, or smashing it down). Opens onto (roll d4) 1: Passage, 2-4: Room.',
  'Locked and trapped stone door. DC 15 perception to find trap. If trap disarmed / avoided / triggered, roll d4 to determine what’s on the other side. 1: Passage, 2: Stairs, 3-4: Room.',
  'Secret door. Does your PC know it’s there? Through to (roll d4) 1: hidden passage, 2-4: Hidden chamber.',
  'Entrance, then 10 ft through to an adjacent passageway. Empty archway, no door.',
  'Locked stone door, secured with a puzzle. A DC 14 intelligence check will enable the puzzle to be solved and the door unlocked. Opens into 1: Passage, 2-4: Room.',
  'Roll d6. 1-2: Wooden door. 3-4: Stone door. 5-6: Iron door. Roll d6. 1-3: locked, 4-6 unlocked. Roll d6. 1: trapped, 2-6 untrapped. Roll d6. 1-2: locked, 3-6: unlocked.',
  'Trapped door. DC 15 perception to find trap. If trap disarmed / avoided / triggered, roll d4 to determine what’s on the other side. 1: Passage, 2-4: Room.',
  'Locked door, can only be opened with a key which is on the body of a humanoid monster somewhere in this dungeon. There is a reason they do not want anyone to enter.',
  'Door composed of elemental energy, such as fire or lightning. You can move through it, but you will take 3d8 damage of whatever type it is composed of.',
  'Heavy stone door, requires athletics check to open (DC 16). -1 hp for every 2 failed strength checks. Opens into room.',
  'Door is smashed and hanging off its hinges (why?). Leads into a room',
];

export const DoorGenerator = (fields: any) => {
  const roll = random(1, doorsTable.length) - 1;
  return doorsTable[roll];
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
