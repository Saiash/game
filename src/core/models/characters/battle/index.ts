import { Character } from '..';
import { CTX } from '../../../../types';
import { throwDices } from '../../../utils/diceThrower';
import { Weapon } from '../../items/weapon';
import { damageMods, damageTypes } from '../../items/weapon/damage';
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
  rof: number;
};

export type damagePayload = {
  zone: string;
  value: number;
  type: damageTypes;
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
    const { weapon, zone } = options;
    const attackResult = this.rollForAttack(options);
    const amountOfHits = this.countOfHits(options, attackResult);
    if (attackResult.result) {
      return {
        value: this.rollForDamage(options),
        type: weapon.getDamageType(),
        zone,
        amountOfHits,
        armorDelimiter: weapon.getArmorDelimiter(),
      };
    }
    return null;
  }

  countOfHits(options: attackOptions, attackResult: CheckResults) {
    const { weapon, rof } = options;
    if (!attackResult.result) {
      return 0;
    }
    if (rof > 1) {
      const possibleHits =
        Math.floor(attackResult.successMargin / weapon.getRecoil()) + 1;
      return possibleHits > options.rof ? options.rof : possibleHits;
    }
    return 1;
  }

  defend(options: defendOptions) {}

  recieveDamage(damagePayload: damagePayload) {
    const { value, type, zone, armorDelimiter } = damagePayload;

    const dr = this.getDRForZone() / armorDelimiter;
    const rawDamage = value - dr;
    if (rawDamage <= 0) return;
    const resultingDmg = rawDamage * damageMods[type];

    this.character.doll.receiveDamageByZone(resultingDmg, zone, type);
  }

  private rollForAttack(options: attackOptions): CheckResults {
    const { weapon } = options;
    const skillCode = weapon.getSkill();

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
    const { weapon, type } = options;
    const dmgModel =
      weapon.getOwnStr() === 0
        ? this.character.secondaryAttributes.getByCode<Damage>('dmg')
        : weapon;
    if (type && type === 'swing') {
      return dmgModel.calculateSwingVal(weapon.strRequired * 3);
    }
    return dmgModel.calculateThrustVal(weapon.strRequired * 3);
  }

  private rollForDamage(options: attackOptions): number {
    const { weapon } = options;
    const dmgModfromStr = this.getDamageModByAttackType(options);
    const dmgModFromWeapon = weapon.getDamageMod();
    const strBased = weapon.isStrBased();

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
    const { weapon, target } = options;
    const range = weapon.getRange()[1];
    if (!weapon.isRanged() || range === null) return false;

    return range >= this.calculateDistance(target.battleManager.getLocation());
  }

  explosionDamage(options: attackOptions, distance: number) {
    return this.rollForDamage(options) / (distance * 3);
  }

  rollForAffliction(options: attackOptions) {
    const { weapon } = options;
    const bonusFromRange = this.isTargetTooFar(options) ? 3 : 0;
    this.character.attributeManager.check(
      'ht',
      this.getDRForZone() + weapon.getDamageMod().mod + bonusFromRange
    );
    //наложить состояние
  }

  checkWeaponReach(target: Character, weapon: Weapon): boolean {
    const reach = weapon.getReach();
    const targetLocation = target.battleManager.getLocation();
    const distance = this.calculateDistance(targetLocation); // //нужно реализовать рассчет координат
    return reach.some(r => r === distance);
  }

  calculateDistance(coordinates: [number, number]): number {
    return 1;
  }
}
// для воздействия - состязание с ЗД или волей, иначе накладывается состояние. СП добавляется к ЗД или воле
