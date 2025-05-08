import { Character } from "..";
import { CharacterBodyPartModel } from "../../../engine/models/entity/models/characterBodyPart";
import { DataStore } from "../../../engine/models/store/store";
import { bodyPartsList } from "./types";

export class BodyPart extends CharacterBodyPartModel {

  constructor({ store, path }: { store: DataStore, path: bodyPartsList[], character?: Character }) {
    super(store, [...path]);
  }
}
