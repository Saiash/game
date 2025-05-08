import { DataStore } from "../../../../engine/models/store/store";
import { BodyPart } from "../bodyPart";
import { bodyPartsList } from "../types";
import { Character } from "../..";

export class DollLeftArm extends BodyPart {
  private character: Character;

  constructor({ store, character }: { store: DataStore, character: Character, path: bodyPartsList[] }) {
    super({ store, path: ['leftArm'] });
    this.character = character;
  }

  initDefaultValues() {
    this.setName('Left Arm');
  }
}