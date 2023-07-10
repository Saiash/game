import { random } from 'lodash';
import { DefaultCombinedGenerator } from '../defaultCombinedGenerator';

const clearfelledTable = {
  50: 'Clearfelled area Large section of forest removed for local industry',
  60: 'Army cutting down trees to build siege weapons. 40% human 50% army still there',
  70: 'This clear area is the result of a forest fire, not active clearfelling. DC 12 nature check to discern cause. Q/A rolls to determine cause.',
  80: 'Clearfelled area contains an unmarked settlement Roll on Unmarked Settlement Table.',
  90: 'Area being clearfelled presently. Workers are 70% human. Contracted by nearby large settlement. Q/A to find out more.',
  100: 'Area being clearfelled presently. Workers are 70% human. Timber will go to building new Unmarked Settlement Roll on Unmarked Settlement table. Workers camp nearby',
};

const clearingTable = {
  52: 'Natural clearing, devoid of trees Is something watching you from the trees? Q/A roll. Do you notice it?',
  58: 'Druid circle containing standing stones Q/A roll to see what you can discern. Clue 20%',
  65: 'Totems and other sinister symbols, possibly dark rituals take place here. Q/A rolls, medium encounter 10%. Clue 40%',
  71: 'Clearing contains a pond, watering hole for local wildlife Easy encounter(beast) 20%. If left alone it will probably just take a drink and leave.',
  77: 'Abandoned campsite. Q/A rolls, investigation rolls to find out more. Clue 50%',
  83: 'Active campsite Perception check, DC 8, to determine whether you hear the inhabitants before seeing them. 50% friendly.',
  89: 'Magic at work here - some sort of dimensional rift? Q/A rolls to see what’s happening here!',
  95: 'Structure present in the clearing. Roll on Structures table.',
  98: 'Treant meeting currently in progress Q/A / Charisma rolls to interact?',
  100: 'Magical glade. A mage or some other magic user (or fey creatures) has a residence here. 50% friendly. Q/A rolls to determine interaction. Perhaps they have a quest for you!',
};

const gullyTable = {
  50: 'Standard gully',
  57: 'Gully with a waterway Roll on waterways table',
  64: 'Rocky gully containing caves 25% easy encounter. Q/A & investigation rolls to investigate caves. 15% chance they lead to tunnels. 10% NPC.',
  71: 'Gully that looks as if recently caused, Q/A / nature rolls to discern cause perhaps by an earthquake or other natural disaster… or by a huge creature perhaps!',
  78: 'Dry gully containing the bones of many animals. A graveyard of sorts Q/A nature rolls to find out more',
  85: 'Heavily wooded gully, an oasis for a particular colony of creatures Q/A nature rolls to find out more. Are they still here? 25% Easy encounter, 25% clue',
  92: 'Gully with evidence of mining - an abandoned mining operation Mines may lead quite far underground. Go to Random Dungeon Generator',
  100: 'Magical wooded gully. A druid, or wizard, or Fey creatures lives here! Friendly 50%, Clue 50%',
};

const hillsFeatureTable = {
  50: 'Low, rolling hills Covered with overarching terrain. In a forest, wooded hills. In grassland, grassy hills.',
  57: 'Rocky hills abundant with caves, may also possess a network of natural tunnels Q/A rolls to see whether tunnels are present and whether they are inhabited. Clue 25%',
  64: 'Slightly higher hills, giving a good view of the surrounding area Q/A roll to see whether you can see anything of interest. 10% NPC.',
  71: 'Sharply jutting, rocky hills, practically unscalable Athletics check to scale, DC 16. Fall damage if fail?',
  78: 'Dry, low plateau. Monument 25%',
  85: 'Slightly wooded hills, small patches of forest. Easy encounter 25%. Roll on Small wood minor feature table.',
  92: 'Not hills but barrows of some kind, possibly burial mounds! Q/A to determine nature of these mounds. May lead to tunnels.',
  100: 'Hills are home to some sort of colony. 50% humanoid, otherwise some sort of burrowing beast. Q/A rolls to determine what lurks here.',
};

const lakeTable = {
  50: 'Medium-sized lake, unmarked on map. Situated in overarching terrain. 40% easy encounter. Use overarching terrain for encounter table. 10% NPC.',
  55: 'Medium sized lake, small settlement somewhere on its shores. Roll on Unmarked Settlement Table',
  60: 'Smallish lake / pond / watering hole Q/A to discern whether anything lurks here. 30% medium encounter. Use overarching terrain for encounter table',
  65: 'Large, unmapped lake, with a waterway running out of it. Could be rideable in a canoe DC 19 Survival check to craft canoe if trees are nearby. 10% NPC.',
  70: 'Medium sized lake, small settlement somewhere on its shores. Roll on Unmarked Settlement Table, adding 20 to roll.',
  75: 'Large, unmapped lake, with small mountain range by its shores Roll on Small Mountain Range table.',
  80: 'Large lake with small woods on its shores Roll on Small Woods Table',
  85: 'Medium-sized lakes with many boats Q/A rolls to determine more. 25% clue. 40% NPC',
  90: 'Small lake or pond, serves as a lair for some aquatic creature 25% clue',
  95: 'Medium-sized lake, fish jumping DC 15 Survival check to catch a fish.',
  100: 'Sacred pool of some sort. Magical in nature Q/A to discern whether any rituals are going on / magic user NPCs nearby.',
};

const oasisTable = {
  46: 'Oasis with pool of refreshing water at its centre. Ideal campsite Good place for a long rest, especially in a desert',
  52: 'On reaching it, you discover it is a mirage. Just deserts.',
  58: 'Oasis with pool but water is… not quite right. 30% poisoned, or something else. 50% favourable effect. Q/A rolls / Nature check to discern more',
  64: 'Oasis contains a travelling caravan of desert merchants 90% friendly. Are you able to approach with stealth so they don’t notice you?',
  70: 'Oasis contains a large camp of desert nomads. 50% friendly. Are you able to approach with stealth so they don’t notice you?',
  76: 'Oasis contains a shrine or temple of some sort Q/A / Investigation roll to find out more.',
  82: 'Oasis contains a ruin of some sort Q/A / Investigation roll to find out more.',
  88: 'Oasis with bandits / raiders / other adventurers using it as a stopoff point 50% friendly. Are you able to approach with stealth so they don’t notice you?',
  94: 'Oasis with a waypoint / fresh horses / supplies Restock on some basics! Q/A roll to discern more.',
  100: 'Some sort of magical barrier here… it could only be described as a Wonderwall. Q/A rolls / Arcana check to discern nature of barrier.',
};

const rockyTable = {
  52: 'Rocky outcrop Protruding above overarching terrain.',
  58: 'Outcrop serves as a vantage point for humanoid scouts DC 14 perception roll to see if your PC notices. Q/A to discern more.',
  65: 'Small wood atop this outrcrop Roll on Small Wood table',
  71: 'If scaled, PC might find a structure or monument on top of this feature 50% structure, 50% monument ',
  77: 'Rocky outcrop is actually an island in the middle of a lake Roll on Lake Table',
  83: 'Rocky outcrop is actually an assortment of large boulders scattered around. Q/A to determine more. How did they get here? 50% medium encounter (possibly with surprise vs you)',
  89: 'Interesting formation of standing stones atop the outcrop. DC 12 Survival check to scale this feature and investigate further',
  95: 'An NPC stands atop this outcrop and is calling out to you, beckoning you to join them up there Q/A to discern more.',
  100: 'Outcrop has been fashioned into the face or form of a well-known god. 50% worshippers present. Shrine atop the outcrop? Q/A to discern more.',
};

const mountainRangeTable = {
  55: 'Standard small mountain range, mostly uniform size, no huge peaks Will have snow if it is winter or near to winter. DC 16 Survival roll to scale (climbing gear also required)',
  60: 'Small mountain range with some large peaks As above',
  65: 'Small mountain range that appears to possess a large amount of caves Caves might lead to tunnels / dungeons',
  70: 'Mountain range appears to be home to a colony / settlement of some kind. Dwarven? Some kind of mountain dwelling creature. Roll on Unmarked Settlement table.',
  75: 'Small mountain range covered by forest. Roll on Small Wood Table.',
  80: 'Small mountain range, rugged and dangerous, partially wooded. Giant eagles and the like. Hard encounter 50%',
  85: 'Bandits / Raiders using these mountains as a hideout. But does your PC know? Perception DC 18 to discern. Hard encounter 70%',
  90: 'Small mountain range by lake. Roll on Lake Table.',
  95: 'Small mountain range with colony of Giants (or Q/A rolls to find out more perhaps other humanoids)!',
  100: 'Small mountain range containing a (Roll d8) 1: monastery, 2: wizard tower, 3: hidden town, 4: community of druids, 5: secret dwarven kingdom, 6: secret gnomish kingdom, 7: citadel for an assassin’s order, 8: Whatever takes your fancy! Q/A rolls to determine more',
};

const woodTable = {
  55: 'Standard type of wood for this area',
  60: 'Trees dead, as if by some mysterious disease. Use Q/A rolls to see if you can determine the nature of the affliction',
  65: 'Ancient wood, twisted, gnarled trees. Clue 25%',
  70: 'Serene, Sylvan wood Q/A rolls to check for signs of life',
  75: 'Dark, thick wood, full of menace Hard encounter 20%',
  80: 'Wood which is in the process of being clearfelled for timber Q/A rolls to determine who is clearfelling and why',
  85: 'Wood which has been ravaged by forest fire Q/A rolls to determine cause of fire',
  90: 'Wood in which a band of raiding humanoids is currently hiding Clue 50%. Medium encounter 35%',
  95: 'Wood containing a clearing containing totem / standing stones Medium encounter 25%, Clue 10%',
  100: 'Wood inhabited by humanoid settlement such as elves, gnomes, halflings Q/A rolls to determine whether you meet them',
};

const structureTable = {
  4: 'Mine 10% inhabited',
  8: 'Cemetery / Tomb 30% haunted / undead',
  12: 'Small castle / keep 30% deserted (with possible monster inhabitants) ',
  16: 'Manor House 50% inhabited',
  20: 'Monastery 90% inhabited',
  24: 'Shrine / Temple 50% humanoid inhabitants',
  28: 'Watchtower 50% inhabitated, 50% humans',
  32: 'Farm House 80% inhabited, 5% under attack currently',
  36: 'Fence Q/A roll / nature roll to determine its purpose',
  40: 'Windmill',
  44: 'Watermill Roll on Waterway Table',
  48: 'Old well 50% hidden cave / tunnel at bottom. 30% clue',
  52: 'Hermit Hut / Cave 70% inhabited, 40% clue',
  56: 'Lone tavern / inn 90% inhabited. Q/A to discern more',
  60: 'Roll d4. 1-2: Hunting cabin. 3-4: Fishing Hut. 25% inhabited. Might contain basic supplies. Q/A roll to determine. If fishing hut, (roll d4) roll on 1-2: Waterway Table, 3-4: Lake Table.',
  64: 'Hideout / Bunker DC 16 perception check to notice. If you are in familiar / favoured terrain, make at advantage.',
  68: 'Waypoint. Stopoff for couriers / horse trader Q/A to discern more. 75% friendly or neutral.',
  72: 'Training Camp Q/A to discern more',
  76: 'Bridge. (Roll d4) 1-2: Small, 3: Medium, 4: Large Roll on Waterways Table',
  80: 'Medium Bridge Roll on Waterways Table',
  84: 'Large Bridge Roll on Waterways Table',
  88: 'Large Castle / Keep 80% inhabited (if uninhabited, then something else will have moved in).',
  92: 'Ruins 50% hard encounter. 10% deadly encounter. Clue 60%.',
  96: 'Burial Mounds / Barrows What lies beneath?',
  100: 'Wizard Tower Definitely inhabited. 60% friendly.',
};

const swampFeatureTable = {
  50: 'Standard swamp Difficult terrain (half movement) 25% easy encounter',
  57: 'Thick, dense swamp, almost impossible to traverse, extending in all directions forward. Extremely difficult terrain, movement slowed to quarter of normal.',
  64: 'Patchy swamp with dry areas. Perfect area for bandits or raiders to have a camp. Hard encounter 50%. Clue 30%',
  71: 'Wetland containing many ponds and a network of waterways. May need a small boat to traverse. Survival check, DC 19, to craft a small kayak. Otherwise, might need to go around, adding travel time.',
  78: 'Dark, eerie swamp, with an eldritch aura Something evil hides in here… Q/A rolls to determine what! Clue 10%',
  85: 'A land forgotten by time! Ancient swamp, small part of a more primeval wilderness that was here before Hard encounter 50%',
  92: 'Fey Oasis 50% encounter with fey. Wisdom check (DC 16) or you get totally turned around, lost.',
  100: 'Swamp inhabited by humanoids who wish to remain hidden from the world. Q/A rolls to determine whether you meet them.',
};

const settlementTable = {
  52: 'Standard (d4) 1-2: Hamlet, 3-4: Village Situated in overarching terrain. Q/A rolls to find out more.',
  56: 'Nomadic camp',
  60: 'Abandoned settlement. Roll 1d4: 1-2: Hamlet, 3-4: Village. Q/A rolls to discern cause of abandonment and also how long ago it was abandoned.',
  63: 'Tower. Appears uninhabited Q/A to discern whether anything lurks here.',
  67: 'Tower. Appears inhabited Q/A rolls to discern more.',
  71: 'Worker’s camp Appropriate to overarching  terrain. 70% human, otherwise some other sort of humanoid.',
  74: 'Hamlet, inhabited Settlement founded on surrounding industry. 70% human, otherwise some other sort of humanoid.',
  78: 'Hamlet, but some sort of affliction on the inhabitants  Q/A rolls to discern more. 70% human, otherwise some other sort of humanoid.',
  82: 'Unmapped village, inhabited Settlement founded on surrounding industry. 70% human, otherwise some other sort of humanoid.',
  86: 'Village, but in discord / strife  Q/A rolls to discern more. 70% human, otherwise some other sort of humanoid.',
  90: 'Hidden town / humanoid colony. A good amount of inhabitants. How have they remained hidden, and why? Q/A rolls to discern more. 70% human, otherwise some other sort of humanoid.',
  94: 'Tree hut village 80% humanoid inhabitants (probably wood elves)',
  100: 'Roll d6. 1: Town is here magically. 2: result of a dimensional rift. 3: Town is illusory but inhabitants still interact with you. 4: Floating town, suspended by magic, 5: Town is a haven for undead, 6: Whatever takes your fancy! 50% hard encounter. Q/A rolls to discern more.',
};

const waterwayTable = {
  50: 'Stream /river running through  Runs through overarching terrain. 15% waterfall nearby.',
  55: 'Slightly larger river, might be difficult to ford Survival check, DC 12 to ford. On a fail, you lose 1d4 perishable goods downstream and are soaked through. If it`s cold, you might need to stop and make a fire to dry off.',
  60: 'A man-made waterway of some sort, irrigation channel perhaps?  Q/A rolls to discern purpose',
  65: 'Deep but narrow stream. You see something float by! Dex check to grab it. Clue 50%, otherwise just a branch.',
  70: 'Large, unmapped river. Could be rideable in canoe. DC 19 Survival check to craft boat (if in forest or trees are nearby). Q/A rolls and DC 12 History roll to discern more about this river.',
  75: 'Sizable river with pond areas. Probably quite good for fishing or swimming. Medium encounter 50%, Clue 25%',
  80: 'Sizable, unmapped river, spanned by bridge. Easy encounter 25%. Q/A roll to discern who built the bridge and for what purpose. 35% Unmarked Settlement nearby.',
  85: 'Meandering river with pier where small boats are tied up. Ferryman? Q/A rolls to determine purpose of boats.',
  90: 'This appears to be a drainage channel for a nearby settlement. Roll on Unmarked Settlement table.',
  95: 'Humanoids or fey (elves? dryads?) frolicking in the water. 25% get freaky',
  100: 'Shallow brook… what’s that you see there amongst the pebbles? Loot 20% (use CR of last creature defeated). Clue 40% ',
};

const table: { [index: string]: { type: string; options?: string[] } } = {
  type: {
    type: 'select',
    options: [
      'clearfelled',
      'clearing',
      'gully',
      'hills',
      'lake',
      'oasis',
      'rocky',
      'mountain',
      'wood',
      'structure',
      'swamp',
      'settlement',
      'waterway',
    ],
  },
};
const GenName = 'Wild_Features';

const tablesTable: { [index: string]: { [index: number]: string } } = {
  clearfelled: clearfelledTable,
  clearing: clearingTable,
  gully: gullyTable,
  hills: hillsFeatureTable,
  lake: lakeTable,
  oasis: oasisTable,
  rocky: rockyTable,
  mountain: mountainRangeTable,
  wood: woodTable,
  structure: structureTable,
  swamp: swampFeatureTable,
  settlement: settlementTable,
  waterway: waterwayTable,
};

const generator = (fields: any) => {
  const [[type]] = fields;
  const roll = random(1, 100);
  const table = tablesTable[type];
  const values = Object.keys(table);
  const [rolledValue] = values.filter(value => roll <= parseInt(value));
  return table[rolledValue as any];
};

export const WildFeatures = ({
  writeToLog,
}: {
  writeToLog: (result: string) => void;
}) => {
  return DefaultCombinedGenerator({
    table,
    GenName,
    generator,
    writeToLog,
  });
};
