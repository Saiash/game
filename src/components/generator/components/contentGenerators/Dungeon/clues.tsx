import { Generator as defaultGenerator } from '..';
import { random } from 'lodash';
import { DefaultCombinedGenerator } from '../defaultCombinedGenerator';
import { generator as generatorType } from '../tables';

const table: { [index: string]: { type: string; options?: string[] } } = {};
const GenName = 'Dungeon_Clues';

export const cluesTable = [
  'A broken arrow of a distinctive type.',
  'The monster’s / NPCs weapon has dried blood on it. But what type?',
  'The carcass or area has a strange odour.',
  'There is a strange noise coming from somewhere in this area.',
  'You see tracks leading off from this area.',
  '1d10 platinum pieces in an ornately embroidered pouch. The embroidery mentions someone’s name.',
  'Magical compass, player has to figure out the command word to activate it.',
  'The corpse is gripping an envelope. The wax sealed with an unknown sigil.',
  'You see fresh blood stains splattered on the wall. One part is still trickling down as you enter the room.',
  'The body is covered in map symbols',
  'The body is covered in runic tattoos.',
  'The body is contorted, showing evidence of reconstructive surgery to head and chest cavity, with attachments & implants below the skin',
  'The body is branded with a number, directly behind the neck',
  'The body has a significant number of healed wounds, suggesting ongoing punishment and whipping',
  'An old wooden toy-horse, that you were used to play with as a child and that you forgot until now',
  'You hear loud Ravens/Crows nonstop cawing nearby.',
  'You find a pendant with a missing piece.',
  'You find sacks of bloody corn and wheat.',
  'You notice a bright flash of purplish light just out of the corner of your eye',
  'The room/corpse is covered in a thin layer of frost.',
  'A note with only the name of the nearby town written in it.',
  'Stones patterned in a directional arrow with the words Help me under it.',
  'Part of a map',
  'Broken weapon with runes on it',
  'A holy symbol',
  'An adventurer’s backpack containing a journal, with entries that stop abruptly.',
  'A rope hanging from above. It appears to have been crudely hacked at the bottom end.',
  'Graffiti on the wall. “Beware the Great Hall!”',
  'In the floor is a hole, and beside it a spade. It appears as if someone started digging and then gave up. Or...',
  'A bear or man trap sitting in a pool of blood. Perhaps a severed limb nearby.',
  'Tracks, only they are made out in flour.',
  'A broken lantern',
  'An empty coffin, the lid broken',
  'Lying on the floor, a glass chess piece.',
  'Broken blade of a sword',
  'Singing, distant and mournful.',
  'Whispering, from somewhere in the room, disembodied. It stops and starts again, unnervingly.',
  'A pile of carefully stacked stones is situated in the middle of this area',
  'Loud thumping from either above or below the current area you are in',
  'You notice a loose brick in the wall. Peering behind it, you find a hidden scroll. What is written on it? (Q/A or situations table) ',
  'A hole has been bashed through the wall into an adjoining chamber. This chamber doesn’t appear to have any other way in or out.',
  'A pack and its contents strewn across the ground. (Suggests live or dead NPC somewhere in the dungeon)',
  'There is rubble here, but it has been swept to the walls in neat piles by someone, obviously using a broom.',
  'You hear whispering right behind you, but when you turn, no one is there.',
  'A severed hand covered in stitches lies on the floor',
  'A book of hand-sketched images of various humanoids, some of them with large red crosses through them.',
  'A body is here, and has been savaged, as if by a wild animal.',
  'A shield lies on the ground in two pieces. Whatever ripped through this obviously possesses great strength',
  'A platinum piece, glued to the floor.',
  'A small ray of light shines through a crack in the ceiling',
  'A trail of blood, as if a body were being dragged, leads away. It stops suddenly.',
  'A long list of names, all of them crossed out except for the last 5-10. Close to the end is the PCs name.',
  'A detailed colour map of the local area, marked with several previously unknown ruins.',
  'A chill wind, as if someone opened a door onto an arctic tundra, blows through this area briefly',
  'You hear the sound of metal being dragged across stone. It continues for a while and then stops.',
  'Suddenly you realize your footfalls have become completely silent',
  'Ball bearings or caltrops litter the floor in this area.',
  'Geometric shapes drawn in chalk on the floor',
  'The floor is covered by a rug. A close inspection will reveal some spots of a dark liquid, possibly blood...',
  'A map of a labyrinth neatly made on a piece of parchment.',
  'A letter of recommendation from a noble no-one has heard of.',
  'The remains of an adventurer lie slumped against the wall. In his hand he holds a vial or a note.',
  'Hurried footsteps, coming from somewhere up ahead.',
  'A small beast (cockroach?) sits in an alcove. As you pass, it speaks to you!',
  'Bucket of entrails from an unknown creature',
  'Target practice dummy is nearby',
  'The sound of glass smashing comes from somewhere, echoing off the walls.',
  'A fine dagger with a retracting blade. Who did it belong to?',
  'A piece of shell that looks like it came from a large egg',
  'The wall has been carved away, and a large standing stone has been placed in the newly formed alcove. It is covered in strange writing.',
  'A large roast meal is laid out on a table, complete with place settings. It is steaming hot and looks delicious, but it totally untouched.',
  'Goblin graffiti on the walls',
  'A large collection of animal bones, organized into a pile.',
  'A cauldron sits in the corner.',
  'A hand… it looks severed, but the odd thing is that its made of stone.',
  'You find a stone jar containing teeth of all descriptions.',
  'An adventurer’s journal. Reading through, you see the entries stop suddenly',
  'A table and single chair is in the corner. The table is spattered with large globs of wax.',
  'An empty net on the ground, torn to shreds.',
  'A stack of clay tablets, all with indecipherable runes',
  'A lute, but the neck has been smashed from the body and is dangling by the strings.',
  'The shrunken head of a kobold',
  'Book containing a history of the world - not of this world though.',
  'A well, in the middle of the dungeon. A rope hangs down from its top.',
  'You step on a stone and hear a click...',
  'A clanking sound, followed by a hissing sound, from somewhere below...',
  'A jar of pickled eyes. ',
  'There is a campfire circle containing a prepared fire, but it has not been lit.',
  'Hammered to a nearby door or affixed to the wall is a piece of framed parchment - completely blank.',
  'An empty brandy bottle.',
  'A six-sided dice that is all ones.',
  'A halfling’s skull, intact except for a perfect circle removed at the top.',
  'A large assortment of clay pots in alcoves, all containing noxious-smelling liquids.',
  'A weapons rack is on the wall, containing several ancient, rusted weapons. A few of these might be able to be restored if taken to an expert.',
  'A steady flow of moisture down a nearby wall leads you to think you might be below a body of water.',
  'The sound of children’s laughter, echoing from every direction',
  'A bag of feathers. A successful nature check (DC 12) reveals them to be from a harpy.',
  'You find a parchment containing what looks like a recipe for a particular kind of potion.',
  'A pouch of spell components',
  'Magic item! Relevant to quest. Roll once on table (d4) 1-2: A, 3-4: B',
];

export const DungeonCluesGenerator = (fields: any) => {
  const roll = random(1, cluesTable.length) - 1;
  return cluesTable[roll];
};

export const DungeonClues = ({
  writeToLog,
}: {
  writeToLog: (result: string) => void;
}) => {
  return DefaultCombinedGenerator({
    table,
    GenName,
    generator: DungeonCluesGenerator,
    writeToLog,
  });
};
