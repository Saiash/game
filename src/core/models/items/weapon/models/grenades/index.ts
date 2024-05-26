import { BlackGunPowederGrenade } from './blackGunPowederGrenade';
import { ChemicalGrenade } from './chemicalGrenade';
import { ExplosiveGrenade } from './explosiveGrenade';
import { FragGrenade } from './fragGrenade';
import { Grenade } from './grenade';
import { Molotov } from './molotov';
import { PlasmaGrenade } from './plasmaGrenade';
import { StunGrenade } from './stunGrenade';

export type grenadesList =
  | 'blackGunPowederGrenade'
  | 'explosiveGrenade'
  | 'stungGrenade'
  | 'chemicalGrenade'
  | 'molotov'
  | 'plasmaGrenade'
  | 'fragGrenade'
  | 'grenade';

export const grenadesModels = {
  blackGunPowederGrenade: BlackGunPowederGrenade,
  explosiveGrenade: ExplosiveGrenade,
  stungGrenade: StunGrenade,
  chemicalGrenade: ChemicalGrenade,
  molotov: Molotov,
  plasmaGrenade: PlasmaGrenade,
  fragGrenade: FragGrenade,
  grenade: Grenade,
};
