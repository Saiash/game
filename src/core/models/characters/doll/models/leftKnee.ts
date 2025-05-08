import { Character } from "../..";
import { DataStore } from "../../../../engine/models/store/store";
import { BodyPart } from "../bodyPart";
import { bodyPartsList } from "../types";

export class DollLeftKnee extends BodyPart {
  private character: Character;

  constructor({ store, character }: { store: DataStore, character: Character, path: bodyPartsList[] }) {
    super({ store, path: ['leftKnee'] });
    this.character = character;
  }

  initDefaultValues() {
    this.setName('Left Knee');
  }
} 