import {
  attrsMap,
  attrsMapType,
  dataAttribute,
  DataStructure,
  dataValue,
  reverseMap,
} from './types';

export class DataStore {
  struct: DataStructure;

  constructor() {
    this.struct = new Map();
    this.struct.set('object', new Map());
  }

  getByPath(
    path: attrsMapType[]
  ): dataAttribute | DataStructure | dataValue | null {
    let result: dataAttribute | DataStructure | null = this.struct;
    while (path.length) {
      const attrName = path.shift();
      if (!attrName) {
        return result;
      }
      const newVal: any = result?.get(attrName);
      if (newVal instanceof Map) {
        result = newVal;
      } else if (!path.length) {
        return newVal;
      } else {
        return null;
      }
    }
    return result;
  }

  getValueByPath(path: attrsMapType[]): dataValue {
    const dataValue = this.getByPath(path);
    if (!(dataValue instanceof Set)) {
      throw new Error('dataAttribute instead of dataValue');
    }
    return dataValue;
  }

  loadFromRaw(rawStructure: string) {
    const textRows: string[] = rawStructure.split('\n');
    let parentPath: dataAttribute[] = [];

    textRows.forEach(row => {
      if (row === '') {
        return;
      }

      const _row = row.split('  ');
      const pureRowText = _row.pop() as string;
      const offset = _row.length;

      const attributeWithValue = pureRowText.split(': ');
      const mappedAttribute = attrsMap.get(attributeWithValue[0] as string);
      const value =
        attributeWithValue.length === 2
          ? (attributeWithValue[1] as string)
          : null;

      if (!mappedAttribute) {
        throw new Error(
          `unknown attribute name at Data Structure, ${mappedAttribute}, ${pureRowText}`
        );
      }

      if (offset === 0) {
        this.struct.set(mappedAttribute, new Map());
        parentPath.push(this.struct.get(mappedAttribute) as dataAttribute);
      } else {
        if (value && parentPath[offset - 1]?.has(mappedAttribute)) {
          (parentPath[offset - 1]?.get(mappedAttribute) as dataValue).add(
            value
          );
        } else if (value) {
          parentPath[offset - 1]?.set(mappedAttribute, new Set([value]));
        }

        if (!value) {
          parentPath = parentPath.splice(0, offset);
          if (!parentPath[offset - 1]?.has(mappedAttribute)) {
            parentPath[offset - 1]?.set(mappedAttribute, new Map());
          }
          parentPath.push(
            parentPath[offset - 1]?.get(mappedAttribute) as dataAttribute
          );
        }
      }
    });

    return this;
  }

  getDataToSave() {
    let string = '';
    this.struct.forEach((value, key) => {
      string = this._parseDataRecursive(string, value, key);
    });
    return string;
  }

  private _parseDataRecursive(
    string: string,
    value: dataAttribute,
    key: attrsMapType,
    offset: number = 0
  ) {
    const offsetStrong = ''.padStart(2 * offset, ' ');
    if (value instanceof Set) {
      const attribute = reverseMap.get(key);
      const atoms = Array.from(value).join(`\n${offsetStrong}${attribute}: `);
      string += `${offsetStrong}${attribute}: ${atoms}\n`;
    } else {
      string += `${offsetStrong}${reverseMap.get(key)}\n`;
      value.forEach((_value, _key) => {
        string = this._parseDataRecursive(
          string,
          _value as dataAttribute,
          _key,
          offset + 1
        );
      });
    }
    return string;
  }
}

//всегда объявлять object - без него жизнни не будет
// сделать базовые классы для работы со всеми основные данные
// object для работы с корнем
// base для работы с основными техническими свойствами
