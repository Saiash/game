export type table = { [index: number]: string };
export type generator = {
  table: table;
  diceSides: number;
  mod?: number;
};

export const weather: generator = {
  table: {
    1: 'Super Cold / blizzard',
    4: 'Rain / snow',
    8: 'Overcast / Rain',
    11: 'Clear, warm / overcast',
    18: 'Clear, hot / clear',
    21: 'Very Hot / hot',
  },
  diceSides: 20,
};

export const disturbance: generator = {
  table: {
    20: 'Noise (loud)',
    35: 'Animal (indifferent)',
    50: 'Animal (Hostile)',
    60: 'verid Dream',
    80: 'Curious NPC',
    85: 'Bandit / theif',
    90: 'Monster',
    91: 'Disaster',
    101: 'Weather change',
  },
  diceSides: 100,
};

export const weather_mountain: generator = {
  table: weather.table,
  diceSides: 20,
  mod: -5,
};

export const weather_desert: generator = {
  table: weather.table,
  diceSides: 20,
  mod: 5,
};

export const contentsGenerators: { [index: string]: generator } = {
  disturbance,
  weather,
  weather_desert,
  weather_mountain,
};
