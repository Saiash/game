import { BaseEntityModel } from '.';
import { DataStore } from '../../store/store';
import { attrsMapType } from '../../store/types';

const fixedPath: attrsMapType[] = ['character'];

export class CharacterModel extends BaseEntityModel {
  protected fixedPath: attrsMapType[] = fixedPath;

  constructor(store: DataStore) {
    super(store, fixedPath);
  }

  // this.cultures = cultures || ['default'];
  // this.socialGroups = socialGroups || [];

  setGender(gender: string) {
    return this._setValue('gender', gender);
  }

  getGender(): string {
    const [gender] = this._getValueAsSet('gender');
    return gender;
  }

  setSocialStatus(socialStatus: string) {
    return this._setValue('socialStatus', socialStatus);
  }

  getSocialStatus(): number {
    const [socialStatus] = this._getValueAsSet('socialStatus');
    return parseInt(socialStatus) as number;
  }

  setCultures(cultures: string[]) {
    this._setValue('cultures', cultures.pop() as string);
    cultures.forEach(culture => this._addValue('cultures', culture));
    return this;
  }

  getCultures(): string[] {
    return Array.from(this._getValueAsSet('cultures'));
  }

  setSocialGroups(socialGroups: string[]) {
    this._setValue('socialGroups', socialGroups.pop() as string);
    socialGroups.forEach(socialGroups => this._addValue('socialGroups', socialGroups));
    return this;
  }

  getSocialGroups(): string[] {
    return Array.from(this._getValueAsSet('socialGroups'));
  }
}
