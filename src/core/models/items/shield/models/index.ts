import { shieldFabric, shieldFabricType } from '../fabric';

const _parryingBuckler: shieldFabricType = {
  code: 'parryingBuckler',
  legalityClass: 4,
  hp: 16,
  selfDR: 4,
  defenceBonus: 1,
  techLevel: 0,
  cost: 50,
  weight: 8,
  coverDr: 8,
  img: '',
  zones: [['rightTool'], ['leftTool']],
  //TODO: +1 block
};
export const parryingBuckler = shieldFabric(_parryingBuckler);

const _smallShieldLight: shieldFabricType = {
  code: 'smallShieldLight',
  legalityClass: 4,
  hp: 12,
  selfDR: 2,
  defenceBonus: 1,
  techLevel: 0,
  cost: 30,
  weight: 3,
  coverDr: 5,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};
export const smallShieldLight = shieldFabric(_smallShieldLight);

const _mediumShieldLight: shieldFabricType = {
  code: 'mediumShieldLight',
  legalityClass: 4,
  hp: 16,
  selfDR: 2,
  defenceBonus: 2,
  techLevel: 0,
  cost: 45,
  weight: 7,
  coverDr: 6,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};
export const mediumShieldLight = shieldFabric(_mediumShieldLight);

const _largeShieldLight: shieldFabricType = {
  code: 'largeShieldLight',
  legalityClass: 4,
  hp: 18,
  selfDR: 2,
  defenceBonus: 3,
  techLevel: 0,
  cost: 68,
  weight: 10,
  coverDr: 6,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};
export const largeShieldLight = shieldFabric(_largeShieldLight);

const _smallShieldHeavy: shieldFabricType = {
  code: 'smallShieldHeavy',
  legalityClass: 4,
  hp: 15,
  selfDR: 4,
  defenceBonus: 1,
  techLevel: 1,
  cost: 40,
  weight: 6,
  coverDr: 7,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};
export const smallShieldHeavy = shieldFabric(_smallShieldHeavy);

const _homericBucklerMedium: shieldFabricType = {
  code: 'homericBucklerMedium',
  legalityClass: 4,
  hp: 21,
  selfDR: 4,
  defenceBonus: 2,
  techLevel: 1,
  cost: 100,
  weight: 16,
  coverDr: 9,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};
export const homericBucklerMedium = shieldFabric(_homericBucklerMedium);

const _mediumShieldHeavy: shieldFabricType = {
  code: 'mediumShieldHeavy',
  legalityClass: 4,
  hp: 20,
  selfDR: 4,
  defenceBonus: 2,
  techLevel: 1,
  cost: 60,
  weight: 14,
  coverDr: 9,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};
export const mediumShieldHeavy = shieldFabric(_mediumShieldHeavy);

const _homericBucklerLarge: shieldFabricType = {
  code: 'homericBucklerLarge',
  legalityClass: 4,
  hp: 22,
  selfDR: 4,
  defenceBonus: 3,
  techLevel: 1,
  cost: 150,
  weight: 20,
  coverDr: 9,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};
export const homericBucklerLarge = shieldFabric(_homericBucklerLarge);

const _largeShieldHeavy: shieldFabricType = {
  code: 'largeShieldHeavy',
  legalityClass: 4,
  hp: 22,
  selfDR: 4,
  defenceBonus: 3,
  techLevel: 1,
  cost: 90,
  weight: 20,
  coverDr: 9,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};
export const largeShieldHeavy = shieldFabric(_largeShieldHeavy);

const _duelingBuckler: shieldFabricType = {
  code: 'duelingBuckler',
  legalityClass: 4,
  hp: 11,
  selfDR: 4,
  defenceBonus: 0,
  techLevel: 3,
  cost: 25,
  weight: 2,
  coverDr: 6,
  img: '',
  zones: [['rightTool'], ['leftTool']],
  //TODO: +1 block
};
export const duelingBuckler = shieldFabric(_duelingBuckler);

const _heaterShield: shieldFabricType = {
  code: 'heaterShield',
  legalityClass: 4,
  hp: 19,
  selfDR: 4,
  defenceBonus: 2,
  techLevel: 3,
  cost: 75,
  weight: 13,
  coverDr: 8,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};
export const heaterShield = shieldFabric(_heaterShield);

const _kiteShield: shieldFabricType = {
  code: 'kiteShield',
  legalityClass: 4,
  hp: 21,
  selfDR: 4,
  defenceBonus: 3,
  techLevel: 3,
  cost: 120,
  weight: 18,
  coverDr: 9,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};
export const kiteShield = shieldFabric(_kiteShield);

const _duelingLongShield: shieldFabricType = {
  code: 'duelingLongShield',
  legalityClass: 4,
  hp: 21,
  selfDR: 4,
  defenceBonus: 3,
  techLevel: 4,
  cost: 200,
  weight: 16,
  coverDr: 9,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};
export const duelingLongShield = shieldFabric(_duelingLongShield);
