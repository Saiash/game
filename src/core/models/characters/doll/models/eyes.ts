import { Character } from "../..";
import { DataStore } from "../../../../engine/models/store/store";
import { BodyPart } from "../bodyPart";
import { bodyPartsList } from "../types";

export class DollEyes extends BodyPart {
  private character: Character;

  constructor({ store, character }: { store: DataStore, character: Character, path: bodyPartsList[] }) {
    super({ store, path: ['eyes'] });
    this.character = character;
  }

  initDefaultValues() {
    this.setName('Eyes');
  }
}; 