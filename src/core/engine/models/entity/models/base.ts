import { BaseEntityModel } from '.';
import { DataStore } from '../../store/store';
import { attrsMapType } from '../../store/types';

const fixedPath: attrsMapType[] = ['baseParameters'];

export class BaseParametersModel extends BaseEntityModel {
  protected fixedPath: attrsMapType[] = fixedPath;

  constructor(store: DataStore) {
    super(store, fixedPath);
  }

  setId(id: number): void {
    this._setValue('id', `${id}`);
  }

  getId(): number {
    const [id] = this._getRawValue('id'); // set.keys().next().value
    return parseInt(id) as number;
  }

  setName(name: string) {
    return this._setValue('name', name);
  }

  getName(): string {
    const [name] = this._getRawValue('name'); // set.keys().next().value
    return name;
  }

  setLocation(locationId: number) {
    return this._setValue('location', `${locationId}`);
  }

  getLocation(): string {
    const [name] = this._getRawValue('location'); // set.keys().next().value
    return name;
  }
}
