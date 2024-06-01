import { Character } from '..';
import { CTX } from '../../../../types';
import { throwDices } from '../../../utils/diceThrower';
import { Weapon, weaponManagerTypes } from '../../items/weapon';
import { damageMods, damageType } from '../../items/weapon/damage';
import { MeleeManager } from '../../items/weapon/meleeManager';
import { RangedManager } from '../../items/weapon/rangedManager';
import { CheckResults } from '../../skills/skillManager';
import { Damage } from '../secondaryAttributes/models/damage';

export type defendOptions = {
  type: string; //TODO: тип защиты ака уворот
};

export type attackType = 'swing' | 'thrust';

export type attackOptions = {
  weapon: Weapon;
  target: Character;
  type?: attackType;
  zone: string; //TODO: зоны атаки
  weaponType: weaponManagerTypes;
  rof: number;
};

export type damagePayload = {
  zone: string;
  value: number;
  type: damageType;
  armorDelimiter: number;
  amountOfHits: number;
};

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

  attack(options: attackOptions): damagePayload | null {
    const { weapon, weaponType, zone } = options;
    const weaponManager = weapon.getManagerByType(weaponType);
    if (!weaponManager) return null;

    const attackResult = this.rollForAttack(options);
    const amountOfHits = this.countOfHits(options, attackResult);
    if (attackResult.result) {
      return {
        value: this.rollForDamage(options),
        type: weaponManager.getDamageType(),
        zone,
        amountOfHits,
        armorDelimiter: weaponManager.getArmorDelimiter(),
      };
    }
    return null;
  }

  countOfHits(options: attackOptions, attackResult: CheckResults) {
    const { weapon, rof, weaponType } = options;
    const weaponManager = weapon.getManagerByType(weaponType);
    if (!weaponManager) return 1;
    if (!(weaponManager instanceof RangedManager)) return 1;

    if (!attackResult.result) {
      return 0;
    }
    if (rof > 1) {
      const possibleHits =
        Math.floor(attackResult.successMargin / weaponManager.getRecoil()) + 1;
      return possibleHits > options.rof ? options.rof : possibleHits;
    }
    return 1;
  }

  defend(options: defendOptions) {
    //Например у цепа внутри набора урона могут быть модификаторы к защите (-4 к парированию и -2 к блоку)
  }

  recieveDamage(damagePayload: damagePayload) {
    const { value, type, zone, armorDelimiter } = damagePayload;

    const dr = this.getDRForZone() / armorDelimiter;
    const rawDamage = value - dr;
    if (rawDamage <= 0) return;
    const resultingDmg = rawDamage * damageMods[type];

    this.character.doll.receiveDamageByZone(resultingDmg, zone, type);
  }

  private rollForAttack(options: attackOptions): CheckResults {
    const { weapon, weaponType } = options;

    const weaponManager = weapon.getManagerByType(weaponType);
    if (!weaponManager) throw new Error();
    const skillCode = weaponManager.getSkill();

    const weaponStr = weapon.getStrRequired();
    const str = this.character.attributeManager.getByCode('str').getValue();
    let mod = 0;
    if (weaponStr > str) {
      mod = weaponStr - str;
    }
    return this.character.skillManager.check({
      code: skillCode,
      difficulty: mod,
      timeMod: 0,
    });
  }

  recieveDamageFromExplosion(damagePayload: damagePayload) {
    return this.recieveDamage({ ...damagePayload, armorDelimiter: 1 });
  }

  getDRForZone() {
    //как-то получить список предметов в этой зоне
    //у каждого предмета получить DR
    // const dr = armor.reduce()
    return 0;
  }

  private getDamageModByAttackType(options: attackOptions) {
    const { weapon, weaponType, type } = options;

    const weaponManager = weapon.getManagerByType(weaponType);
    if (!weaponManager) throw new Error();

    let dmgModel = this.character.secondaryAttributes.getByCode<Damage>('dmg');
    if (
      weaponManager instanceof RangedManager &&
      weaponManager.getOwnStr() !== 0
    ) {
      if (type && type === 'swing') {
        return weaponManager.calculateSwingVal(weapon.strRequired * 3);
      }
      return weaponManager.calculateThrustVal(weapon.strRequired * 3);
    }
    if (type && type === 'swing') {
      return dmgModel.calculateSwingVal(weapon.strRequired * 3);
    }
    return dmgModel.calculateThrustVal(weapon.strRequired * 3);
  }

  private rollForDamage(options: attackOptions): number {
    const { weapon, weaponType } = options;
    const weaponManager = weapon.getManagerByType(weaponType);
    if (!weaponManager) throw new Error();

    const dmgModfromStr = this.getDamageModByAttackType(options);
    const dmgModFromWeapon = weaponManager.getDamageMod();
    const strBased = weaponManager.isStrBased();

    const dmg = {
      dices: (strBased ? dmgModfromStr.dices : 0) + dmgModFromWeapon.dices,
      mod: (strBased ? dmgModfromStr.mod : 0) + dmgModFromWeapon.mod,
    };

    if (dmg.mod >= 4) {
      dmg.dices += 1;
      dmg.mod -= 4;
    } else if (dmg.mod <= -4 && dmg.dices > 1) {
      dmg.dices -= 1;
      dmg.mod += 4;
    }
    const damage = throwDices(dmg.dices, 6, dmg.mod);
    return this.isTargetTooFar(options) ? damage / 2 : damage;
  }

  isTargetTooFar(options: attackOptions) {
    const { weapon, target, weaponType } = options;
    const weaponManager = weapon.getManagerByType(weaponType);
    if (!weaponManager) throw new Error();
    if (!(weaponManager instanceof RangedManager)) return true;

    const range = weaponManager.getRange();
    return (
      range.maxRange >=
      this.calculateDistance(target.battleManager.getLocation())
    );
  }

  explosionDamage(options: attackOptions, distance: number) {
    return this.rollForDamage(options) / (distance * 3);
  }

  rollForAffliction(options: attackOptions) {
    const { weapon, weaponType } = options;

    const weaponManager = weapon.getManagerByType(weaponType);
    if (!weaponManager) throw new Error();

    const bonusFromRange = this.isTargetTooFar(options) ? 3 : 0;
    this.character.attributeManager.check(
      'ht',
      this.getDRForZone() + weaponManager.getDamageMod().mod + bonusFromRange
    );
    //наложить состояние
  }

  checkWeaponReach(target: Character, weapon: Weapon): boolean {
    const weaponManager = weapon.getManagerByType('melee');
    if (!weaponManager || !(weaponManager instanceof MeleeManager))
      throw new Error();

    const reach = weaponManager.getReach();
    const targetLocation = target.battleManager.getLocation();
    const distance = this.calculateDistance(targetLocation); // //нужно реализовать рассчет координат
    return reach.some(r => r === distance);
  }

  calculateDistance(coordinates: [number, number]): number {
    return 1;
  }
}
//TODO для воздействия - состязание с ЗД или волей, иначе накладывается состояние. СП добавляется к ЗД или воле
//TODO BluntTrauma - любой урон, который нанес меньше чем DR*2+1 урона считается как урон с множителем 1* и не накладывает никаких особых эффектов. Например 8 режущего урона против 4 брони нанесут только 4 урона, а не 6
