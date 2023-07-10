import { random } from 'lodash';
import { DefaultCombinedGenerator } from '../defaultCombinedGenerator';

const arcticTable = {
  60: 'Continuing arctic terrain 5 miles',
  65: 'Icy hills (roll hills and interpret… arctically). 1d4 m.',
  70: 'Small mountain range / foothills 1d4 m.',
  75: 'Waterway (probably frozen) 1d4 m.',
  80: 'Small Wood 1d4 m.',
  85: 'Rocky outcrop 1d4 m.',
  90: 'Unmarked Settlement',
  95: 'D6 roll. 1-2: Structure / 3-4: Monument / 5-6: Interesting landscape feature',
  100: 'Monster Lair',
};

const coastalTable = {
  60: 'Continuing coastal terrain 5 m.',
  65: 'Hills / (with cliffs perhaps). 1d4 m.',
  70: 'Gully 1d4 m.',
  75: 'Waterway 1d4 m.',
  80: 'Small Wood 1d4 m.',
  85: 'Rocky outcrop 1d4 m.',
  90: 'Unmarked Settlement',
  95: 'D6 roll. 1-2: Structure / 3-4: Monument / 5-6: Interesting landscape feature',
  100: 'Monster Lair',
};

const desertTable = {
  70: 'Continuing desert 5 m.',
  75: 'Oasis (roll Oasis Table) 1d4 m.',
  80: 'Small mountain range (dry, no snow) 1d4 m.',
  85: 'Rocky outcrop 1d4 m.',
  90: 'Unmarked Settlement',
  95: 'D6 roll. 1-2: Structure / 3-4: Monument / 5-6: Interesting landscape feature',
  100: 'Monster Lair',
};

const forestTable = {
  52: 'Continuing forest 5 miles',
  56: 'Small clearing',
  60: 'Large clearing',
  64: 'Small wooded gully 1d4 m.',
  68: 'Large wooded gully 1d4 m.',
  72: 'Waterway',
  76: 'Lake 1d4 m.',
  80: 'Clearfelled area 1d4 m.',
  84: 'Rocky outcrop 1d4 m.',
  88: 'Swamp 1d4 m.',
  92: 'Unmarked Forest Settlement',
  96: 'D6 roll. 1-2: Structure / 3-4: Monument / 5-6: Monster lair',
  100: 'Interesting landscape feature',
};

const grasslandTable = {
  56: 'Continuing grassland 5 miles',
  60: 'Hills 1d4 m.',
  64: 'Swamp 1d4 m.',
  68: 'Gully 1d4 m.',
  72: 'Waterway 1d4 m.',
  76: 'Lake 1d4 m.',
  80: 'Small Wood 1d4 m.',
  84: 'Rocky outcrop 1d4 m.',
  88: 'Small mountain range / Foothills 1d4 m.',
  92: 'Unmarked Settlement ',
  96: 'D6. 1-2: Structure / 3-4: Monument / 5-6: Interesting landscape feature',
  100: 'Monster Lair',
};

const hillsTable = {
  55: 'Continuing hills 5 miles',
  60: 'Gully 1d4 m.',
  65: 'Waterway 1d4 m.',
  70: 'Lake 1d4 m.',
  75: 'Small Wood 1d4 m.',
  80: 'Rocky outcrop 1d4 m.',
  85: 'Small mountain range / Foothills 1d4 m.',
  90: 'Unmarked Settlement',
  95: 'D6 roll. 1-2: Structure / 3-4: Monument / 5-6: Interesting landscape feature',
  100: 'Monster Lair',
};

const mountainsTable = {
  55: 'Continuing mountains 5 m.',
  60: 'Gully 1d4 m.',
  65: 'Waterway 1d4 m.',
  70: 'Lake 1d4 m.',
  75: 'Small Wood 1d4 m.',
  80: 'Rocky outcrop 1d4 m.',
  85: 'Small mountain range / Foothills 1d4 m.',
  90: 'Unmarked Settlement',
  95: 'D6. 1-2: Structure/3-4: Monument / 5-6: Interesting landscape feature',
  100: 'Monster Lair',
};

const swampTable = {
  51: 'Continuing swamp 5 m.',
  58: 'Waterway 1d4 m.',
  65: 'Lake 1d4 m.',
  72: 'Small Wood 1d4 m.',
  79: 'Rocky outcrop 1d4 m.',
  86: 'Unmarked Settlement',
  93: 'D6 roll. 1-2: Structure / 3-4: Monument / 5-6: Interesting landscape feature',
  100: 'Monster Lair',
};

const table: { [index: string]: { type: string; options?: string[] } } = {
  type: {
    type: 'select',
    options: [
      'arctic',
      'coast',
      'desert',
      'forest',
      'grassland',
      'hills',
      'mountain',
      'swamp',
    ],
  },
};
const GenName = 'Wild_Terrain';

const tablesTable: { [index: string]: { [index: number]: string } } = {
  arctic: arcticTable,
  coast: coastalTable,
  desert: desertTable,
  forest: forestTable,
  grassland: grasslandTable,
  hills: hillsTable,
  mountain: mountainsTable,
  swamp: swampTable,
};

const generator = (fields: any) => {
  const [[type]] = fields;
  const roll = random(1, 100);
  const table = tablesTable[type];
  const values = Object.keys(table);
  const [rolledValue] = values.filter(value => roll <= parseInt(value));
  return table[rolledValue as any];
};

export const WildTerrain = ({
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
