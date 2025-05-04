import { BaseEntityModel } from '.';
import { DataStore } from '../../store/store';
import { attrsMapType } from '../../store/types';

const fixedPath: attrsMapType[] = ['skills'];

export class SkillsModel extends BaseEntityModel {
  protected fixedPath: attrsMapType[] = fixedPath;

  constructor(store: DataStore) {
    super(store, fixedPath);
  }
}
