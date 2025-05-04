import { DataStore } from "../store";
import { attrsMap, dataAttribute, dataValue } from "../types";

export class StoreMerge {
  static mergeByRawStruct(mainStore: DataStore, rawStructure: string) {
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
          `unknown attribute name during Data Structure merge, ${mappedAttribute}, ${pureRowText}`
        );
      }

      if (offset === 0) {
        parentPath.push(mainStore.struct.get(mappedAttribute) as dataAttribute);
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
}


