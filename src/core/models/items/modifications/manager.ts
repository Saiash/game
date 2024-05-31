import { Modification } from '.';
import { CTX } from '../../../../types';
import { calcArmorDelimiter } from '../../../utils/armorDelimiter';
import { Item } from '../item';
import { baseDamageSet } from '../weapon/baseManager';
import { damageType } from '../weapon/damage';
import { meleeDamageSet } from '../weapon/meleeManager';
import {
  baseModifications,
  MODIFICATION_LIST,
  modificationsList,
  optionalModifications,
} from './fabric';

export type modificationSummary = {
  priceMultiplier?: number;
} & optionalModifications;
export type keysOfModificationSummary = keyof modificationSummary;

export class ModificationManager {
  modifications: Modification[] = [];
  item: Item;
  summary: modificationSummary;
  ctx: CTX;

  constructor(modifications: modificationsList[], ctx: CTX, item: Item) {
    this.ctx = ctx;
    this.item = item;
    this.modifications = modifications.map(m =>
      MODIFICATION_LIST[m]({ ctx, item })
    );
    this.summary = {};
  }

  private getBaseArray() {
    return [...this.modifications, this.item.material];
  }

  private getFromCache(name: keysOfModificationSummary) {
    if (this.summary[name]) {
      return this.summary[name];
    }
  }

  private updateCache(name: keysOfModificationSummary, value: any) {
    this.summary = {
      ...this.summary,
      [name]: value,
    };
    return value;
  }

  private mergeModsByKeys(
    mod:
      | optionalModifications['melee']
      | optionalModifications['ranged']
      | optionalModifications['throw'],
    result:
      | optionalModifications['melee']
      | optionalModifications['ranged']
      | optionalModifications['throw'],
    key: string
  ) {
    if (!result || !mod) return;
    //@ts-ignore
    if (!mod[key]) return;
    //@ts-ignore
    if (!result[key]) return;
    if (key === 'dmgMod' || key === 'aim') {
      //@ts-ignore
      result[key] += mod[key];
    }
    if (key === 'damageType') {
      result.damageType = [
        ...(mod.damageType || []),
        ...(result?.damageType || []),
      ];
    }
    if (key === 'armorDelimiter') {
      result.armorDelimiter = calcArmorDelimiter(
        mod?.armorDelimiter || 1,
        result?.armorDelimiter || 1
      );
    }
    if (key === 'newDamageType') {
      result.newDamageType = mod?.newDamageType;
    }
    return result;
  }

  getWeightMultiplier(): Required<optionalModifications>['weight'] {
    const cache = this.getFromCache('weight');
    if (cache) return cache as Required<optionalModifications>['weight'];

    const mod = this.getBaseArray().reduce(
      (result, mod) => result * mod.getWeightMod(),
      1
    );
    return this.updateCache(
      'weight',
      mod
    ) as Required<optionalModifications>['weight'];
  }

  getMalfunctionMultiplier(): Required<optionalModifications>['malfunction'] {
    const cache = this.getFromCache('malfunction');
    if (cache) return cache as Required<optionalModifications>['malfunction'];

    const mod = this.getBaseArray().reduce(
      (result, mod) => result * mod.getMalfunctionMod(),
      1
    );
    return this.updateCache(
      'malfunction',
      mod
    ) as Required<optionalModifications>['malfunction'];
  }

  getBreakChanceMultiplier(): Required<optionalModifications>['breakChance'] {
    const cache = this.getFromCache('breakChance');
    if (cache) return cache as Required<optionalModifications>['breakChance'];

    const mod = this.getBaseArray().reduce(
      (result, mod) => result + mod.getBreakChanceMod(),
      0
    );
    return this.updateCache(
      'breakChance',
      mod
    ) as Required<optionalModifications>['breakChance'];
  }

  getPriceMultiplierMultiplier(): baseModifications['priceMultiplier'] {
    const cache = this.getFromCache('priceMultiplier');
    if (cache) return cache as baseModifications['priceMultiplier'];

    const mod = this.getBaseArray().reduce(
      (result, mod) => result + mod.getPriceMultiplierMod(),
      0
    );
    return this.updateCache(
      'priceMultiplier',
      mod
    ) as baseModifications['priceMultiplier'];
  }

  getMeleeMultiplier(): Required<optionalModifications>['melee'] {
    const cache = this.getFromCache('melee');
    if (cache) return cache as Required<optionalModifications>['melee'];

    const result: optionalModifications['melee'] = {
      dmgMod: 0,
      damageType: [],
      armorDelimiter: 1,
    };
    this.getBaseArray().forEach(mod => {
      const _mod = mod.getMeleeMod();
      if (_mod) {
        Object.keys(_mod).forEach(key => {
          this.mergeModsByKeys(_mod, result, key);
        });
      }
    });
    return this.updateCache(
      'melee',
      result
    ) as Required<optionalModifications>['melee'];
  }

  getRangedMultiplier(): Required<optionalModifications>['ranged'] {
    const cache = this.getFromCache('ranged');
    if (cache) return cache as Required<optionalModifications>['ranged'];

    const result: optionalModifications['ranged'] = {
      dmgMod: 0,
      damageType: [],
      armorDelimiter: 1,
    };
    this.getBaseArray().forEach(mod => {
      const _mod = mod.getRangedMod();
      if (_mod) {
        Object.keys(_mod).forEach(key => {
          this.mergeModsByKeys(_mod, result, key);
        });
      }
    });
    return this.updateCache(
      'ranged',
      result
    ) as Required<optionalModifications>['ranged'];
  }

  getThrowMultiplier(): Required<optionalModifications>['throw'] {
    const cache = this.getFromCache('throw');
    if (cache) return cache as Required<optionalModifications>['throw'];

    const result: optionalModifications['throw'] = {
      aim: 0,
      dmgMod: 0,
      damageType: [],
      armorDelimiter: 1,
    };
    this.getBaseArray().forEach(mod => {
      const _mod = mod.getThrowMod();
      if (_mod) {
        Object.keys(_mod).forEach(key => {
          this.mergeModsByKeys(_mod, result, key);
        });
      }
    });
    return this.updateCache(
      'throw',
      result
    ) as Required<optionalModifications>['throw'];
  }

  mergeDamageSetWithMultipliers(
    damageSet: baseDamageSet | meleeDamageSet,
    modType: 'throw' | 'ranged' | 'melee'
  ): baseDamageSet | meleeDamageSet {
    const mod =
      modType === 'throw'
        ? this.getThrowMultiplier()
        : modType === 'ranged'
        ? this.getRangedMultiplier()
        : this.getMeleeMultiplier();

    const { damageType } = damageSet;
    if (!mod) return damageSet;

    if (
      (mod.damageType && mod.damageType.some(t => t === damageType)) ||
      !mod.damageType
    ) {
      if (mod.dmgMod) {
        damageSet.dmgMod += mod.dmgMod;
      }
      if (mod.newDamageType) {
        damageSet.damageType += mod.newDamageType;
      }
      if (mod.armorDelimiter) {
        damageSet.armorDelimiter = calcArmorDelimiter(
          damageSet.armorDelimiter || 1,
          mod.armorDelimiter
        );
      }
      if (mod.options) {
        mod.options.forEach(option => {
          if (option === 'improvePiType') {
            this.increasePiType(damageSet);
          } else if ((option = 'decreasePiType')) {
            this.decreasePiType(damageSet);
          }
        });
      }
    }
    return damageSet;
  }

  increasePiType(
    damageSet: baseDamageSet | meleeDamageSet
  ): baseDamageSet | meleeDamageSet {
    const types: Partial<damageType>[] = ['pi-', 'pi', 'pi+', 'pi++'];
    const index = types.findIndex(t => t === damageSet.damageType);
    damageSet.damageType =
      index + 1 >= types.length ? types[index] : types[index + 1];
    return damageSet;
  }

  decreasePiType(
    damageSet: baseDamageSet | meleeDamageSet
  ): baseDamageSet | meleeDamageSet {
    const types: Partial<damageType>[] = ['pi-', 'pi', 'pi+', 'pi++'];
    const index = types.findIndex(t => t === damageSet.damageType);
    damageSet.damageType = index - 1 <= 0 ? types[index] : types[index - 1];
    return damageSet;
  }
}
