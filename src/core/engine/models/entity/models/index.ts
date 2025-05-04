import { DataStore } from '../../store/store';
import { attrsMapType, dataAttribute, dataValue } from '../../store/types';

export class BaseEntityModel {
  protected readonly store: DataStore;
  protected fixedPath: attrsMapType[];

  constructor(store: DataStore, fixedPath: attrsMapType[]) {
    this.fixedPath = fixedPath;
    this.store = store;
    if (!this._ifModelExists()) {
      this._init();
    }
  }

  // проверяет существует ли модель в хранилище
  _ifModelExists() {
    let dataAttribute = this.store.getByPath(
      this.getBasePath()
    ) as dataAttribute;
    let result: boolean = false;
    this.fixedPath.forEach(path => {
      result = dataAttribute.has(path);
      if (!result) return result;
      dataAttribute = dataAttribute.get(path) as dataAttribute;
    });
    return result;
  }

  _init() {
    const path = [...this.fixedPath] as attrsMapType[];
    const newDataAttribute = path.pop() as attrsMapType;
    const baseAttr = this.store.getByPath([
      ...this.getBasePath(),
      ...path,
    ]) as dataAttribute;
    return baseAttr.set(newDataAttribute, new Map());
  }

  // возвращает путь к модели
  getPath(): attrsMapType[] {
    return [...this.getBasePath(), ...this.fixedPath];
  }

  // возвращает атрибут по базовому пути, т.е. корневое значение для этой модели; кинет ошибку, если такого нет
  getBaseAttribute(): dataAttribute {
    const dataAttribute = this.store.getByPath(this.getPath());
    if (!dataAttribute) throw new Error('corrupted attribue');
    if (!(dataAttribute instanceof Map))
      throw new Error(
        `DataValue instead of DataAttribute by path ${this.getPath()}`
      );
    return dataAttribute;
  }

  // возвращает значение атрибута по ключу у родительского атрибута
  _getValue(key: attrsMapType): dataAttribute | dataValue | null {
    return this.getBaseAttribute().get(key) || null;
  }

  // возвращает значение атрибута по ключу у родительского атрибута, не кидает ошибки если чего-то нет (или родителя, или искомого значения)
  _getUnsafeValue(key: attrsMapType): dataAttribute | dataValue | null {
    const dataAttribute = this.store.getByPath(this.getPath());
    if (!dataAttribute) return null;
    if (!(dataAttribute instanceof Map))
      throw new Error(
        `DataValue instead of DataAttribute by path ${this.getPath()}`
      );
    return dataAttribute.get(key) || null;
  }

  // устанавливает значение (удалив остальные) атрибута по ключу, у найденного у родительского атрибута узла
  protected _setValue(key: attrsMapType, value: string) {
    const attr = this.getBaseAttribute();
    if (attr.has(key)) {
      (attr.get(key) as Set<string>).clear();
      (attr.get(key) as Set<string>).add(value);
    } else {
      this.getBaseAttribute().set(key, new Set<string>([`${value}`]));
    }
    return this;
  }

  //возвращает только значение; кидает ошибку, если это оказалось аттрибутом / узлом
  _getRawValue(key: attrsMapType): dataValue {
    const value = this._getValue(key);
    if (!value || !(value instanceof Set)) {
      throw new Error(`no correct value parsed, ${value}, ${key}`);
    }
    return value;
  }

  // добавляет еще одно значение в аттрибут
  protected _addValue(key: attrsMapType, value: string) {
    const attr = this.getBaseAttribute();
    if (attr.has(key)) {
      (attr.get(key) as Set<string>).add(value);
    } else {
      this.getBaseAttribute().set(key, new Set<string>([`${value}`]));
    }
    return this;
  }

  // удаляет значение из аттрибута, оставляя остальные
  protected _removeValue(key: attrsMapType, value: string) {
    const attr = this.getBaseAttribute();
    if (attr.has(key)) {
      (attr.get(key) as Set<string>).delete(value);
    }
    return this;
  }

  // возвращает базовый путь для модели
  protected getBasePath(): attrsMapType[] {
    return ['object'];
  }
}
