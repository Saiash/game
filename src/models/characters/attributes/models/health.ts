import { ModificatorManager } from '../../../Modificator';
import { AttributeProps } from '..';
import { Attribute } from '../attribute';

export class Health extends Attribute {
  static getDefaultProps(): AttributeProps {
    return {
      name: 'Health',
      code: 'ht',
      rawValue: 10,
      ModificatorManager: new ModificatorManager(),
      typePriority: 1,
    };
  }
}
