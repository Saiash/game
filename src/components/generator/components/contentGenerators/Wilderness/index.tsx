import { random } from 'lodash';
import { DefaultCombinedGenerator } from '../defaultCombinedGenerator';

const landscapeTable = [
  'Sinkhole',
  'Crevasse caused by earthquake',
  'Geiser / Hot Springs',
  'Landslide',
  'Waterfall',
  'Cave Forest',
  'Blowhole (if not coastal, roll again)',
  'Volcano',
  'Interesting rock formations (caused by lava flow?)',
  'Madmade tunnel',
  'Crater (meteor?)',
  'Tar Pit',
  'River source / spring / river going underground',
  'Quicksand (Perception check to notice?)',
  'Skull / facelike formation of rocks.',
  'Creature-shaped rocks. Basilisk victim?',
  'Petrified forest',
  'A lone pillar with runes',
  'Hanging tree, with noose',
  '1d4 cairns of stone, arranged symetrically',
];

const monumentTable = [
  'Standing stones / Obelisks / Large stone carvings Q/A to discern more. Might have runes inscribed. 10% NPC.',
  'Charcoal burning mound Q/A rolls to determine what is being burnt here? Orcs? ',
  'Tribal totem pole 25% easy encounter. Q/A to determine who is nearby, if anyone.',
  'Small Shrine Q/A to determine god it is dedicated to, and also whether it is currently attended',
  'Sign to show nearby settlements 50% chance at least one of them isn’t on the map. Clue 10%',
  'Cliff face with carved faces of gods Q/A to determine god it is dedicated to, and also whether it is currently attended',
  'Statue of ancient leader Q/A / History rolls to discern more',
  'Statue of famous adventurer Anything hidden here?',
  'Significant / tribally important tree or other natural feature. 70% guarded by tribespeople / barbarians',
  'Ancient Stone Pillars Part of ruins? Q/A / History rolls to discern more',
  'Ruined stone walls Q/A / History rolls to discern more',
  'Altar / Pedestal Sacrificial? 50% stained with blood.',
  'Large, scattered boulders of interesting shapes Q/A / Nature rolls to discern more',
  'Single tomb of notable identity 25% already looted',
  'Mountain of bones Q/A / Nature rolls to discern more. Clue 25%',
  'Ancient battlefield, with monument in remembrance of the dead Q/A / History rolls to discern more. Clue 25%',
  'Burnt down building Clue 50%',
  'Termite or other insect mound Nature check to discern more. 50% easy encounter (with some insect like being perhaps?)',
  'Ley lines Q/A to discern more, like who drew them here and how long ago?',
  'A lone archway in the middle of nowhere! Portal?',
];

const table: { [index: string]: { type: string; options?: string[] } } = {};

export const WildLandscapeGenerator = (fields: any) => {
  const roll = random(1, landscapeTable.length) - 1;
  return landscapeTable[roll];
};

export const WildLandscape = ({
  writeToLog,
}: {
  writeToLog: (result: string) => void;
}) => {
  return DefaultCombinedGenerator({
    table,
    GenName: 'Wild_Landscape',
    generator: WildLandscapeGenerator,
    writeToLog,
  });
};

export const WildMonumentGenerator = (fields: any) => {
  const roll = random(1, monumentTable.length) - 1;
  return monumentTable[roll];
};

export const WildMonument = ({
  writeToLog,
}: {
  writeToLog: (result: string) => void;
}) => {
  return DefaultCombinedGenerator({
    table,
    GenName: 'Wild_Monument',
    generator: WildMonumentGenerator,
    writeToLog,
  });
};
