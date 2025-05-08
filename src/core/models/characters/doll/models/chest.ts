import { Character } from "../..";
import { DataStore } from "../../../../engine/models/store/store";
import { BodyPart } from "../bodyPart";
import { bodyPartsList } from "../types";

export class DollChest extends BodyPart {
  private character: Character;

  constructor({ store, character }: { store: DataStore, character: Character, path: bodyPartsList[] }) {
    super({ store, path: ['chest'] });
    this.character = character;
  }

  initDefaultValues() {
    this.setName('Chest');
  }
}; 