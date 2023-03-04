import { ModificatorManager } from '../../../../../core/managers/ModificatorManager';
import { AttributeProps } from '..';
import { Attribute } from '../attribute';

export class Inteligence extends Attribute {
  static getDefaultProps(): AttributeProps {
    return {
      name: 'Inteligence',
      code: 'int',
      rawValue: 10,
      modificatorManager: new ModificatorManager(),
      typePriority: 0,
    };
  }
}
