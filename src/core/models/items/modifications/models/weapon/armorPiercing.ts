import { modificationFabric, modificationSettings } from '../../fabric';

const settings: modificationSettings = {
  code: 'armorPiercing',
  priceMultiplier: 2,
  ranged: {
    dmgMod: 0,
    newDamageType: 'pi',
    armorDelimiter: 2,
  },
};

export const ArmorPiercing = modificationFabric(settings);
