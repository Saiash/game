import { Generator as defaultGenerator } from '..';
import { random } from 'lodash';
import { DefaultCombinedGenerator } from '../defaultCombinedGenerator';
import { generator as generatorType } from '../tables';
import { throwDices } from '../../../../../core/utils/diceThrower';

const table: { [index: string]: { type: string; options?: string[] } } = {};
const GenName = 'NPC';

const gender = ['Male', 'Female'];
const race = [
  'Human',
  'Human',
  'Human',
  'Human',
  'Human',
  'Tiefling',
  'Aasimar',
  'Dwarf',
  'Elf',
  'Drow',
  'Gnome',
  'Orc',
  'Half-orc',
  'Half-orc',
  'Half-elf',
  'Half-elf',
];

const aligment = [
  'Lawful Good',
  'Lawful Good',
  'Lawful Good',
  'Neutral Good',
  'Chaotic Good',
  'Lawful Neutral',
  'True Neutral',
  'True Neutral',
  'True Neutral',
  'True Neutral',
  'Chaotic Neutral',
  'Lawful Evil',
  'Lawful Evil',
  'Lawful Evil',
  'Neutral Evil',
  'Neutral Evil',
  'Neutral Evil',
  'Neutral Evil',
  'Chaotic Evil',
  'Chaotic Evil',
];

const profession = [
  'Commoner',
  'Commoner',
  'Commoner',
  'Tradesperson / Merchant / Artisan / Professional',
  'Tradesperson / Merchant / Artisan / Professional',
  'Tradesperson / Merchant / Artisan / Professional',
  'Tradesperson / Merchant / Artisan / Professional',
  'Tradesperson / Merchant / Artisan / Professional',
  'Tradesperson / Merchant / Artisan / Professional',
  'Tradesperson / Merchant / Artisan / Professional',
  'Adventurer',
  'Adventurer',
];

const professions = [
  'Farmer',
  'Miller',
  'Artist',
  'Executioner',
  'Herbalist',
  'Restauranteur',
  'Horse trainer',
  'Priest / Cultist',
  'Jeweler',
  'Blacksmith',
  'Engineer',
  'Finesmith',
  'Scribe',
  'Locksmith',
  'Soldier',
  'Jeweller',
  'Banker',
  'Entertainer',
  'Apothecary',
  'Teacher',
  'Woodcutter',
  'Armourer',
  'Tax Collector',
  'Cook',
  'Prostitute',
  'Slave',
  'Tailor',
  'Fishmonger',
  'Ropemaker',
  'Butcher',
  'Fletcher',
  'Fruiterer',
  'Cooper',
  'Thief ',
  'Conman',
  'Cartwright',
  'Petty thief',
  'Carpenter',
  'Healer',
  'Gravedigger / Undertaker',
  'Butler',
  'Winemaker',
  'Clerk',
  'Ferryman',
  'Baker',
  'Fisher',
  'Enchanter',
  'Assassin',
  'Noble',
  'Mage',
  'Monk',
  'Spy',
  'Bard',
  'Trapper',
  'Boatbuilder',
  'Cheesemaker',
  'Ship’s Captain',
  'Innkeeper',
  'Fortune Teller',
  'Dung Shoveller',
  'Handmaiden',
  'Courier ',
  'Servant',
  'Smuggler',
  'Sailor',
  'Actor',
  'Storyteller',
  'Squire',
  'Philosopher',
  'Bandit',
  'Bodyguard',
  'Cleric',
];

const wealth = [
  'Destitute / homeless',
  'Destitute / homeless',
  'Poor',
  'Poor',
  'Poor',
  'Just getting by',
  'Just getting by',
  'Just getting by',
  'Can support themselves',
  'Can support themselves',
  'Can support themselves',
  'Can support themselves',
  'Climbing the ladder',
  'Climbing the ladder',
  'Climbing the ladder',
  'Climbing the ladder',
  'Comfortable',
  'Comfortable',
  'Comfortable',
  'Comfortable',
  'Comfortable',
  'Well-off',
  'Well-off',
  'Well-off',
  'Well-off',
  'Rich',
  'Rich',
  'Rich',
  'Rich',
  'Rich',
  'Extremely Wealthy',
  'Extremely Wealthy',
  'Extremely Wealthy',
  'Extremely Wealthy',
  'Extremely Wealthy',
  'Royalty-level wealth',
  'Royalty-level wealth',
  'Royalty-level wealth',
  'Royalty-level wealth',
];

const disposition = [
  'Shy',
  'Aloof / Superior',
  'Foolish / idiotic',
  'Cocky / Arrogant',
  'Envious',
  'Grumpy',
  'Mischievous (good or evil)',
  'Playful / Joking',
  'Insane',
  'Abrupt / Unpredictable',
  'Melancholic / Airy',
  'Romantic',
  'Frustrated',
  'Stressed',
  'Weird',
  'Serene / Peaceful',
  'Cagy / Mysterious',
  'Distracted',
  'Sad',
  'Single-Minded',
  'Angry',
  'Blase',
  'Joyous',
  'Vengeful',
  'Malicious',
  'Afraid',
  'Disgusted',
  'Resignation',
  'Nostalgic',
  'Envious',
  'Determined',
  'Pity',
  'Disdain',
  'Hopelessness',
  'Amused',
  'Reckless',
  'Lonely',
  'Frivolous',
  'Disoriented',
];

export const NPCGenerator = (fields: any) => {
  const aligmentResult = aligment[random(1, aligment.length) - 1];
  let professionResult = profession[random(1, profession.length) - 1];
  if (professionResult === 'Tradesperson / Merchant / Artisan / Professional') {
    professionResult = professions[random(1, professions.length) - 1];
  }
  const genderResult = gender[random(1, gender.length) - 1];
  const raceResult = race[random(1, race.length) - 1];
  const wealthResult = wealth[random(1, wealth.length) - 1];
  const dispositionResult = disposition[random(1, disposition.length) - 1];
  const age = throwDices(5, 20) - 20;

  return `${raceResult} ${genderResult} ${professionResult} of age ${age}, ${aligmentResult}. Acting ${dispositionResult} and being ${wealthResult}`;
};

export const NPC = ({
  writeToLog,
}: {
  writeToLog: (result: string) => void;
}) => {
  return DefaultCombinedGenerator({
    table,
    GenName,
    generator: NPCGenerator,
    writeToLog,
  });
};
