import { Character } from "../..";
import { DataStore } from "../../../../engine/models/store/store";
import { BodyPart } from "../bodyPart";
import { bodyPartsList } from "../types";

export class DollRightUpperArm extends BodyPart {
  private character: Character;

  constructor({ store, character }: { store: DataStore, character: Character, path: bodyPartsList[] }) {
    super({ store, path: ['rightUpperArm'] });
    this.character = character;
  }

  initDefaultValues() {
    this.setName('Right Upper Arm');
  }
}; 