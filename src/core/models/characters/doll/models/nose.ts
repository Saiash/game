import { Character } from "../..";
import { DataStore } from "../../../../engine/models/store/store";
import { BodyPart } from "../bodyPart";
import { bodyPartsList } from "../types";

export class DollNose extends BodyPart {
  private character: Character;

  constructor({ store, character }: { store: DataStore, character: Character, path: bodyPartsList[] }) {
    super({ store, path: ['nose'] });
    this.character = character;
  }

  initDefaultValues() {
    this.setName('Nose');
  }
}; 