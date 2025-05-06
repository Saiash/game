import { DataStore } from '../store/store';
import { BaseParametersModel } from './models/base';

let entityIdCounter = 0;
export const entityMap = new Map();

export class Entity {
  protected store: DataStore;
  protected baseParameters: BaseParametersModel;

  constructor(rawStruct?: string) {
    this.store = new DataStore();
    this.baseParameters = new BaseParametersModel(this.store);
    entityIdCounter++;

    if (rawStruct) {
      this.store.loadFromRaw(rawStruct);
    } else {
      this.baseParameters.setId(entityIdCounter);
      this.initStore();
    }
  }

  protected initStore(): void { }

  static loadFromRaw(rawStruct: string): Entity {
    return new this(rawStruct);
  }

  static getEntityById(id: number) {
    return entityMap.get(id);
  }

  protected getDataToSave(): string {
    return '';
  }

  getId(): number {
    return this.baseParameters.getId();
  }

  getName(): string {
    return this.baseParameters.getName();
  }

  setName(name: string) {
    this.baseParameters.setName(name);
    return this;
  }

  getLocation() {
    return this.baseParameters.getLocation();
  }

  setLocation(locationId: number) {
    this.baseParameters.setLocation(locationId);
    return this;
  }
}
