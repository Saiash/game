import { random } from 'lodash';
import { DefaultCombinedGenerator } from '../defaultCombinedGenerator';

const merchantTable = [
  ['Inn / Tavern', 10, 8, 6, 4, 2, 1],
  ['Adventuring Supplies', 17, 14, 10, 5, 2, 1],
  ['Animals and Mounts', 12, 11, 9, 7, 5, 3],
  ['Books and Maps', 18, 17, 15, 13, 11, 9],
  ['Jewelry and Gem trader', 20, 19, 18, 16, 14, 12],
  ['Armourer', 18, 16, 14, 12, 10, 8],
  ['Bank', 17, 15, 13, 10, 8, 6],
  ['Tinkerer / Finesmith', 18, 17, 15, 13, 11, 9],
  ['Tailor', 15, 13, 11, 10, 8, 6],
  ['Potion, poison, herbs', 18, 17, 16, 14, 12, 10],
  ['Religious idols & Blessings', 16, 15, 13, 11, 9, 7],
  ['Food & drink seller', 14, 12, 10, 8, 6, 4],
  ['Temple', 16, 14, 12, 10, 8, 6],
  ['Spell tomes and scrolls', 20, 19, 17, 15, 13, 11],
  ['Thieving supplies', 19, 18, 16, 14, 12, 10],
  ['Weapons Shop', 17, 15, 13, 11, 9, 7],
  ['Vehicles and transportation', 15, 12, 13, 10, 8, 6],
  ['Adventurer’s Guild', 19, 18, 16, 14, 12, 10],
  ['Magic Items', 25, 22, 19, 16, 15, 14],
  ['Blacksmith', 12, 10, 8, 6, 4, 2],
  ['Necromancy / Resurrection', 20, 19, 18, 17, 16, 16],
  ['Couriers', 19, 18, 17, 15, 13, 11],
  ['Brothel', 17, 15, 13, 11, 9, 7],
  ['Land Sales', 16, 15, 13, 10, 8, 6],
  ['Carpenter / Cooper / Cartwright', 15, 13, 10, 8, 6, 4],
  ['Entertainer’s Guild', 20, 18, 16, 13, 11, 9],
  ['Healer / Physician', 18, 15, 12, 10, 7, 4],
  [
    'Shipping Contracts / Boatbuilding (must be coastal)',
    19,
    18,
    16,
    14,
    12,
    10,
  ],
  ['Worker’s Union (any type)', 19, 18, 16, 11, 9, 7],
  ['Stonemason', 18, 15, 12, 10, 7, 4],
  ['University ', 21, 21, 18, 16, 14, 12],
  ['Mercenaries', 19, 18, 17, 16, 14, 12],
];

const GenName = 'Merchants';
const table: { [index: string]: { type: string; options?: string[] } } = {
  type: {
    type: 'select',
    options: merchantTable.map(merchant => merchant[0]) as string[],
  },
  settlement: {
    type: 'select',
    options: ['Encampment', 'Hamlet', 'Village', 'Town', 'City', 'Metropolis'],
  },
};

const qualityTable: { [index: string]: any } = {
  Encampment: [7, 11, 15, 18, 20],
  Hamlet: [6, 10, 14, 17, 20],
  Village: [5, 9, 13, 17, 20],
  Town: [4, 8, 12, 16, 20],
  City: [3, 7, 11, 15, 20],
  Metropolis: [2, 5, 12, 15, 20],
};
const qualityIndexRaw = ['Atrocious', 'Poor', 'Medium', 'Good', 'Excellent'];

export const merchantGenerator = (fields: any) => {
  const [[type], [settlement]] = fields;
  const merchant = merchantTable.find(merchant => merchant[0] === type) || [''];
  const settlementIndex = table.settlement.options?.indexOf(settlement) || 0;
  const roll = random(1, 20);
  const isMerchantExists = roll >= (merchant[settlementIndex + 1] as number);
  const qualityRoll = random(1, 20);
  const qualityIndex = qualityTable[settlement].indexOf(
    qualityTable[settlement].find((value: number) => qualityRoll <= value)
  );
  return `${merchant[0]}: ${
    isMerchantExists ? qualityIndexRaw[qualityIndex] : 'None'
  }`;
};

export const Merchants = ({
  writeToLog,
}: {
  writeToLog: (result: string) => void;
}) => {
  return DefaultCombinedGenerator({
    table,
    GenName,
    generator: merchantGenerator,
    writeToLog,
  });
};
