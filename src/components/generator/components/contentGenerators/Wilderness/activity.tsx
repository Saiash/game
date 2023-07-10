import { random } from 'lodash';
import { DefaultCombinedGenerator } from '../defaultCombinedGenerator';

const activitiesTable: { [index: string]: string } = {
  26: 'This area contains more proof of the rumours / leads you are investigating. Roll once on Clue Table (this chapter), or on Chapter 14 tables, then roll again on this table.',
  53: 'You find the beast / monster / cause of the problem you have been looking for. Roll d6. 1-3: Medium Encounter. 4-5: Hard Encounter. 6: Deadly Encounter. (Use Chapter 16). 50% chance you haven’t been noticed. On a successful stealth roll (DC=Creature’s passive perception), attack with surprise.',
  80: 'You find the beast / monster / cause of the problem you have been looking for, and an associated structure or dwelling, such as a lair or ruins that they inhabit.  (You could go to Chapter 8: Dungeon Generation from here) When you find them, roll d6. 1-3: Medium Encounter. 4-5: Hard Encounter. 6: Deadly Encounter. (Use Chapter 16).',
  82: 'You find a lair or dwelling, but it appears currently uninhabited. Perhaps the creature you seek is away causing mischief right now!',
  84: 'Stealth check from all your PCs. If one check is lower than 14, then the creature has noticed your PCs’ arrival and is stalking them, preparing an attack. They will probably be surprised!',
  86: 'This area is not what it was rumoured to be. Make a d100 rolls. If it is 25 or below, roll on the Wilderness Encounter Table. After resolving the encounter, continue exploring the area and make an investigation check, DC 15. If successful, roll again on this table. If unsuccessful, make another d100 roll (as above)',
  88: 'You find another party of adventurers investigating the same rumours / leads you are investigating. They are (d4) 1: Hostile, 2-4: Friendly. There are 1d4 members in the party. Roll on NPC tables (skip professions and roll on class tables instead) to determine who they are, then roll again on this table.',
  90: 'You find a dead party of 1d4 adventurers (use NPC tables if you wish). They have been hacked / maimed savagely, and it appears all their weapons and belongings have been stolen.',
  92: 'You find a dead party of 1d4 adventurers (use NPC tables if you wish).',
  94: 'You meet an NPC, who gives you details of another, far more important quest related to this one. Go to Chapter 7: Quest Generation to find out what it is.',
  96: 'You discover that the creature or target you seek has discovered that something is tracking them, and has departed the area. You could pursue (further rolls on Wilderness generation tables, above), or you could declare the matter solved (10% chance they return once you are gone).',
  98: 'A mysterious NPC, a lone adventurer, is present here, and has resolved the issue. They give proof too (carcass / spoils of completed quest). They tell you that you may claim the fame of completing this, as long as you accompany them.',
  99: 'The target or creature you already seek is dead (possibly by another party of adventurers, who you may meet nearby), but on investigation you discover that the creature did not deserve to die and were probably innocent or were just minding their own business. Whoever gave you these rumours or set you on this quest is either deluded, or else deliberately deceiving you for some reason.',
  100: 'The rumour turns out to be some sort of devious trap to lure your PCs into an ambush! Level appropriate deadly encounter.',
};

const table: { [index: string]: { type: string; options?: string[] } } = {};
const GenName = 'Wild_Activities';

const generator = (fields: any) => {
  const roll = random(1, 100);
  const values = Object.keys(activitiesTable);
  const [rolledValue] = values.filter(value => roll <= parseInt(value));
  return activitiesTable[rolledValue];
};

export const WildActivities = ({
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
