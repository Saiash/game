import { Character } from "../..";
import { DataStore } from "../../../../engine/models/store/store";
import { bodyPartsList } from "../types";
import { BodyPart } from "../bodyPart";

export class DollRightFoot extends BodyPart {
  private character: Character;

  constructor({ store, character }: { store: DataStore, character: Character, path: bodyPartsList[] }) {
    super({ store, path: ['rightFoot'] });
    this.character = character;
  }

  initDefaultValues() {
    this.setName('Right Foot');
  }
}