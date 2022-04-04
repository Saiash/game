import { ModificatorManager } from '../../../Modificator';
import { AttributeProps } from '..';
import { Attribute } from '../attribute';

export class Inteligence extends Attribute {
  static getDefaultProps(): AttributeProps {
    return {
      name: 'Inteligence',
      code: 'int',
      rawValue: 10,
      ModificatorManager: new ModificatorManager(),
      typePriority: 0,
    };
  }
}
