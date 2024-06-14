import { CTX, PartialRecord } from '../../../../types';
import { damagePayload } from '../../../engine/battleEngine/types';
import { throwDices } from '../../../utils/diceThrower';
import { Character } from '../../characters';
import { Weight } from '../../characters/secondaryAttributes/models/weight';
import { Item, ItemId } from '../item';
import { damageType } from '../weapon/damage';
import { DollBodyPart } from './models';
import { ChestBodyPart, PelvisBodyPart, TorsoBodyPart } from './models/_body';
import {
  battleZones,
  dollStructure,
  equipZones,
  majorBodyParts,
} from './types';

export class Doll {
  character: Character;
  ctx: CTX;
  bodyParts: Record<equipZones | battleZones, DollBodyPart>;
  equippedItems: Record<ItemId, Item> = {};

  constructor({ ctx, character }: { ctx: CTX; character: Character }) {
    this.ctx = ctx;
    this.character = character;
    this.bodyParts = {} as unknown as Record<
      equipZones | battleZones,
      DollBodyPart
    >;
    Object.keys(dollStructure).forEach(part => {
      const _part = part as majorBodyParts;
      let classModel = specialBodyPartsList[_part];
      if (!classModel) classModel = DollBodyPart;
      new classModel({
        innerParts: dollStructure[_part],
        character,
        ctx,
        code: _part,
        dollManager: this,
      });
    });
  }

  addBodyPart(code: equipZones | battleZones, bodyPart: DollBodyPart) {
    this.bodyParts[code] = bodyPart;
  }

  equipItem({
    item,
    performer,
    zoneIndex,
  }: {
    item: Item;
    performer: Character;
    zoneIndex?: number;
  }): boolean {
    if (zoneIndex) {
      return this.equipItemByZoneIndex({ item, zoneIndex });
    }
    let equipped = false;
    item.zones.forEach((zoneNameGroup, zoneIndex) => {
      if (!equipped) {
        equipped = this.equipItemByZoneIndex({ item, zoneIndex });
      }
    });
    return equipped;
  }

  private equipItemByZoneIndex({
    item,
    zoneIndex,
  }: {
    item: Item;
    zoneIndex: number;
  }) {
    const zoneGroup = item.getZones(zoneIndex) as equipZones[];
    if (!this.ifPossibleToEquipForZone(zoneGroup)) {
      return false;
    }
    zoneGroup.forEach(zoneName => {
      this.getZoneByCode(zoneName).eqiupItem(item);
    });
    return true;
  }

  recordEquippedItem(item: Item) {
    if (!this.equippedItems[item.getId()]) {
      this.character?.secondaryAttributes
        .getByCode<Weight>('weight')
        .addWeight(item.getWeight());
      this.equippedItems[item.getId()] = item;
      item.setOwner(this.character);
    }
  }

  unrecordEquippedItem(itemId: ItemId) {
    if (this.equippedItems[itemId]) {
      this.character?.secondaryAttributes
        .getByCode<Weight>('weight')
        .removeWeight(this.equippedItems[itemId].getWeight());
      delete this.equippedItems[itemId];
    }
  }

  getItemById(id: ItemId): Item {
    return this.equippedItems[id];
  }

  unequipItem({
    itemId,
    performer,
  }: {
    itemId: ItemId;
    performer: Character;
  }): boolean {
    const item = this.getItemById(itemId);

    item.zones.forEach(zoneNameGroup => {
      zoneNameGroup.forEach(zoneName => {
        this.getZoneByCode(zoneName).uneqiupItem(item);
      });
    });
    this.unrecordEquippedItem(itemId);

    return performer.inventory.add(item); //TODO?
  }

  checkIfPossibleToEquip(item: Item) {
    //TODO: можно надевать до трех слоев брони. Каждый последующий слой дает -1 к DX. Броня должна быть гибкой (flexible) для внутренних слоев. То, что не дает брони - не дает штрафов.
    return item.zones.some(zoneNameGroup => {
      return this.ifPossibleToEquipForZone(zoneNameGroup, item);
    });
  }

  private ifPossibleToEquipForZone(zone: equipZones[], item?: Item) {
    return zone.every(zoneName => {
      return this.getZoneByCode(zoneName).isPossibleToEquip(item);
    });
  }

  equipFromInventory({ index }: { index: number }): boolean {
    const item = this.character.inventory.getItem(index);
    const equipped = this.equipItem({ item, performer: this.character });
    if (equipped) {
      this.character.inventory.removeItem(index);
      item.setOwner(this.character);
      this.ctx.gameData.log.addEvent({
        text: `Item equipped: ${item.getName()}`,
      });
    }
    return equipped;
  }

  getEquippedItems() {
    return this.equippedItems;
  }

  getItemsByZone(code: equipZones) {
    return this.getZoneByCode(code).getAllItems();
  }

  getItemsByZones(codes: equipZones[]) {
    return this.getZonesByCodes(codes).map(z => z.getAllItems());
  }

  receiveDamageByZone(damagePayload: damagePayload) {
    const { zone } = damagePayload;
    return this.getZoneByCode(zone).receiveDamage(damagePayload);
  }

  getZoneByCode(zone: equipZones) {
    return this.bodyParts[zone];
  }

  getZonesByCodes(zones: equipZones[]): DollBodyPart[] {
    return zones.map(z => this.bodyParts[z]);
  }

  getRaw() {}

  initFromRaw() {}

  checkReactionPentalty(): number {
    //TODO: в боевой обстановке это ок; обстановка определяется локацией?
    let penalty = 0;
    if (this.getZoneByCode('face').getDr() >= 1) {
      penalty += 2;
    }
    if (this.getZoneByCode('chest').getDr() >= 2) {
      penalty += 2;
    }
    return penalty;
  }

  getInnerPartByKey(key: equipZones | battleZones) {
    return this.bodyParts[key];
  }

  getRandomHitPart() {
    const roll = throwDices(3, 6);
    if (roll <= 4) {
      return this.getInnerPartByKey('head').getInnerPartByKey('skull');
    } else if (roll === 5) {
      return this.getInnerPartByKey('head').getInnerPartByKey('face');
    } else if ([6, 7].includes(roll)) {
      return this.getInnerPartByKey('leftLeg');
    } else if ([13, 14].includes(roll)) {
      return this.getInnerPartByKey('rightLeg');
    } else if (roll === 8) {
      return this.getInnerPartByKey('leftHand');
    } else if (roll === 12) {
      return this.getInnerPartByKey('rightHand');
    } else if ([9, 10].includes(roll)) {
      return this.getInnerPartByKey('torso').getInnerPartByKey('chest');
    } else if (roll === 11) {
      return this.getInnerPartByKey('torso').getInnerPartByKey('belly');
    } else if (roll === 15) {
      return throwDices(1, 2) === 1
        ? this.getInnerPartByKey('leftHand').getInnerPartByKey('leftPalm')
        : this.getInnerPartByKey('rightHand').getInnerPartByKey('rightPalm');
    } else if (roll === 16) {
      return throwDices(1, 2) === 1
        ? this.getInnerPartByKey('leftLeg').getInnerPartByKey('leftFoot')
        : this.getInnerPartByKey('rightLeg').getInnerPartByKey('rightFoot');
    } else if ([17, 18].includes(roll)) {
      return this.getInnerPartByKey('neck');
    }
  }
}

export const specialBodyPartsList: PartialRecord<
  equipZones | battleZones,
  typeof DollBodyPart
> = {
  torso: TorsoBodyPart,
  chest: ChestBodyPart,
  pelvis: PelvisBodyPart,
};
