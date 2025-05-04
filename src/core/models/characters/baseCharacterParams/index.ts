import { CharacterModel } from "../../../engine/models/entity/models/character";
import { DataStore } from "../../../engine/models/store/store";

export class BaseCharacterParams extends CharacterModel {
  constructor(store: DataStore) {
    super(store);
  }
}
