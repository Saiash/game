import { DataStore } from "../../../../engine/models/store/store";
import { BodyPart } from "../bodyPart";
import { bodyPartsList } from "../types";
import { Character } from "../..";

export class DollNeck extends BodyPart {
  private character: Character;

  constructor({ store, character }: { store: DataStore, character: Character, path: bodyPartsList[] }) {
    super({ store, path: ['neck'] });
    this.character = character;
  }

  initDefaultValues() {
    this.setName('Neck');
  }
}