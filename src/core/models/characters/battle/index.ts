import { Character } from '..';
import { CTX } from '../../../../types';
import {
  attackOptions,
  characterStatus,
  damagePayload,
  defenceOptions,
} from '../../../engine/battleEngine/types';
import { throwDices } from '../../../utils/diceThrower';
import { Armor } from '../../items/armor';
import { battleZones } from '../../items/doll/types';
import { Weapon } from '../../items/weapon';
import { damageMods } from '../../items/weapon/damage';
import { MeleeManager } from '../../items/weapon/meleeManager';
import { RangedManager } from '../../items/weapon/rangedManager';
import { CheckResults } from '../skills/types';
import { defenceResult } from './types';

export class BattleManager {
  ctx: CTX;
  character: Character;
  location: [number, number];

  constructor({ ctx, character }: { ctx: CTX; character: Character }) {
    this.ctx = ctx;
    this.character = character;
    this.location = [0, 0];
  }

  setLocation(newLocation: [number, number]) {
    this.location = newLocation;
  }

  getLocation() {
    return this.location;
  }

  attack(options: attackOptions, mod: number = 0): damagePayload | null {
    const { attackType, zone, hand } = options;
    const weapon = this.character.doll.getItemsByZoneAsMap(`${hand}Tool`)[0];
    if (!(weapon instanceof Weapon)) {
      return null;
    }
    const weaponManager = weapon.getManagerByType(attackType);
    if (!weaponManager) return null;

    const attackResult = this.rollForAttack(options, weapon, mod);
    const amountOfHits = this.countOfHits(options, attackResult, weapon);
    if (attackResult.result) {
      return {
        value: this.rollForDamage(options, weapon),
        type: weaponManager.getDamageType(),
        zone,
        amountOfHits,
        armorDelimiter: weaponManager.getArmorDelimiter(),
      };
    }
    return null;
  }

  checkWeapon(options: attackOptions) {
    const { attackType, hand } = options;
    const weapon = this.character.doll.getItemsByZoneAsMap(`${hand}Tool`)[0];
    if (!(weapon instanceof Weapon)) {
      return null;
    }
    const weaponManager = weapon.getManagerByType(attackType);
    if (!weaponManager) return null;

    return this.rollForAttack(options, weapon);
  }

  countOfHits(
    options: attackOptions,
    attackResult: CheckResults,
    weapon: Weapon
  ) {
    const { rof, attackType } = options;
    const weaponManager = weapon.getManagerByType(attackType);
    if (!weaponManager) return 1;
    if (!(weaponManager instanceof RangedManager)) return 1;

    if (!attackResult.result) {
      return 0;
    }
    if (!!rof && rof > 1) {
      const possibleHits =
        Math.floor(attackResult.successMargin / weaponManager.getRecoil()) + 1;
      return possibleHits > rof ? rof : possibleHits;
    }
    return 1;
  }

  defence(
    options: defenceOptions,
    defenseStatus: characterStatus['defense'],
    outerMod: number = 0
  ): defenceResult {
    //TODO: Например у цепа внутри набора урона могут быть модификаторы к защите (-4 к парированию и -2 к блоку)
    const { type, retreat, damagePayload } = options;
    let result = null;
    if (type === 'dodge') {
      let mod = retreat ? 1 : 0;
      result = this.dodge(mod + defenseStatus.dodgePentaly + outerMod);
    } else if (type === 'parry') {
      result = this.parry(options, defenseStatus.parryPentaly + outerMod);
    } else if (type === 'block') {
      let mod = retreat ? 1 : 0;
      result = this.block(mod + defenseStatus.blockPenalty + outerMod);
    }
    return {
      defenceRoll: result as CheckResults,
      damageTaken: this.recieveDamage(damagePayload),
    };
  }

  private dodge(difficulty: number = 0): CheckResults {
    return this.character.secondaryAttributes
      .getByCode('dodge')
      .check(difficulty);
  }

  private parry(options: defenceOptions, difficulty: number = 0) {
    //можно заблокировать оружием в левой или правой руке
    //если нет оружия - то безоружным боем
    //Если есть оружие - чекаем по наибольшему из скиллов
    //если оружия нет - надо собрать все безоружные скиллы и выбрать наибольший
    const items = Object.values(
      this.character.doll.getItemsByZones(['rightTool', 'leftTool'])
    ).filter(item => item instanceof Weapon);
    if (items.length >= 1) {
      let betterItem: Weapon = items[0];
      if (items.length === 2) {
        if (
          ((items[1] as Weapon).managers?.meleeManager?.getParryValue(
            options.retreat || false
          ) || 0) >
          ((items[0] as Weapon).managers?.meleeManager?.getParryValue(
            options.retreat || false
          ) || 0)
        ) {
          betterItem = items[1];
        }
      }
      return betterItem.managers?.meleeManager?.checkParry(options, difficulty);
    } else {
      //TODO: доделать парирование от других скиллов?
      return this.character.skillManager
        .getByCode('brawling')
        .check(difficulty + (options.retreat ? 1 : 0));
    }
  }

  private block(difficulty: number = 0): CheckResults {
    return this.character.skillManager.getByCode('shield').check(difficulty);
  }

  recieveDamage(damagePayload: damagePayload) {
    return this.character.doll.receiveDamageByZone(damagePayload);
  }

  private rollForAttack(
    options: attackOptions,
    weapon: Weapon,
    outerMod: number = 0
  ): CheckResults {
    const { attackType } = options;

    const weaponManager = weapon.getManagerByType(attackType);
    if (!weaponManager) throw new Error();
    const skillCode = weaponManager.getSkill();

    const weaponStr = weapon.getStrRequired();
    const str = this.character.attributeManager.getByCode('str').getValue();
    let mod = 0 + outerMod;
    if (weaponStr > str) {
      mod = mod + str - weaponStr;
    }
    return this.character.skillManager.check({
      code: skillCode,
      difficulty: mod + (options.options?.accuracy || 0),
      timeMod: 0,
    });
  }

  recieveDamageFromExplosion(damagePayload: damagePayload) {
    return this.recieveDamage({ ...damagePayload, armorDelimiter: 1 });
  }

  getDRForZone(zone: battleZones) {
    return Object.values(this.character.doll.getItemsByZone(zone))
      .filter(a => a instanceof Armor)
      .reduce((acc, armor) => acc + armor.getDR(), 0);
  }

  private getDamageModByAttackType(options: attackOptions, weapon: Weapon) {
    const { attackType } = options;

    const weaponManager = weapon.getManagerByType(attackType);
    if (!weaponManager) throw new Error();

    return weaponManager.getDmgMod();
  }

  private rollForDamage(options: attackOptions, weapon: Weapon): number {
    const { attackType } = options;
    const weaponManager = weapon.getManagerByType(attackType);
    if (!weaponManager) throw new Error();

    const dmgModfromStr = this.getDamageModByAttackType(options, weapon);
    const dmgModFromWeapon = weaponManager.getDamageMod();
    const strBased = weaponManager.isStrBased();

    const dmg = {
      dices: (strBased ? dmgModfromStr.dices : 0) + dmgModFromWeapon.dices,
      mod:
        (strBased ? dmgModfromStr.mod : 0) +
        dmgModFromWeapon.mod +
        (options.options?.dmgMod || 0),
    };

    if (dmg.mod >= 4) {
      dmg.dices += 1;
      dmg.mod -= 4;
    } else if (dmg.mod <= -4 && dmg.dices > 1) {
      dmg.dices -= 1;
      dmg.mod += 4;
    }
    const damage = throwDices(dmg.dices, 6, dmg.mod);
    return attackType === 'ranged' && this.isTargetTooFar(options, weapon)
      ? damage / 2
      : damage;
  }

  isTargetTooFar(options: attackOptions, weapon: Weapon): boolean {
    const { target, attackType } = options;
    const weaponManager = weapon.getManagerByType(attackType);
    if (!weaponManager) throw new Error();
    if (!(weaponManager instanceof RangedManager)) return true;

    const range = weaponManager.getRange();
    return (
      range.maxRange >= this.calculateDistance([0, 0]) // TODO: правиьлные координаты
    );
  }

  explosionDamage(options: attackOptions, distance: number) {
    //TODO: return this.rollForDamage(options) / (distance * 3);
    return 0;
  }

  rollForAffliction(options: attackOptions) {
    const { hand, attackType, zone } = options;
    const weapon = this.character.doll.getItemsByZoneAsMap(`${hand}Tool`)[0];
    if (!(weapon instanceof Weapon)) {
      return null;
    }

    const weaponManager = weapon.getManagerByType(attackType);
    if (!weaponManager) throw new Error();

    const bonusFromRange = this.isTargetTooFar(options, weapon) ? 3 : 0;
    this.character.attributeManager.check(
      'ht',
      this.getDRForZone(zone) +
        weaponManager.getDamageMod().mod +
        bonusFromRange
    );
    //TODO: наложить состояние
  }

  checkWeaponReach(target: Character, weapon: Weapon): boolean {
    const weaponManager = weapon.getManagerByType('melee');
    if (!weaponManager || !(weaponManager instanceof MeleeManager))
      throw new Error();

    const reach = weaponManager.getReach();
    const targetLocation = target.battleManager.getLocation();
    const distance = this.calculateDistance(targetLocation); // //TODO: нужно реализовать рассчет координат
    return reach.some(r => r === distance);
  }

  calculateDistance(coordinates: [number, number]): number {
    return 1;
  }
}
//TODO для воздействия - состязание с ЗД или волей, иначе накладывается состояние. СП добавляется к ЗД или воле
//TODO BluntTrauma - любой урон, который нанес меньше чем DR*2+1 урона считается как урон с множителем 1* и не накладывает никаких особых эффектов. Например 8 режущего урона против 4 брони нанесут только 4 урона, а не 6
