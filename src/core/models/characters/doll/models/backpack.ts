import { Character } from "../..";
import { DataStore } from "../../../../engine/models/store/store";
import { BodyPart } from "../bodyPart";
import { bodyPartsList } from "../types";

export class DollBackpack extends BodyPart {
  private character: Character;

  constructor({ store, character }: { store: DataStore, character: Character, path: bodyPartsList[] }) {
    super({ store, path: ['backpack'] });
    this.character = character;
  }

  initDefaultValues() {
    this.setName('Backpack');
  }
}; 