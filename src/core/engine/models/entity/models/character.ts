import { BaseEntityModel } from '.';
import { DataStore } from '../../store/store';
import { attrsMapType } from '../../store/types';

const fixedPath: attrsMapType[] = ['character'];

export class CharacterModel extends BaseEntityModel {
  protected fixedPath: attrsMapType[] = fixedPath;

  constructor(store: DataStore) {
    super(store, fixedPath);
  }

  setGender(gender: string) {
    return this._setValue('gender', gender);
  }

  getGender(): string {
    const [gender] = this._getRawValue('gender');
    return gender;
  }

  setSocialStatus(socialStatus: string) {
    return this._setValue('socialStatus', socialStatus);
  }

  getSocialStatus(): number {
    const [socialStatus] = this._getRawValue('socialStatus');
    return parseInt(socialStatus) as number;
  }
}
