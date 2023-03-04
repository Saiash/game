import { ModificatorManager } from '../../../../../core/managers/ModificatorManager';
import { AttributeProps } from '..';
import { Attribute } from '../attribute';

export class Health extends Attribute {
  static getDefaultProps(): AttributeProps {
    return {
      name: 'Health',
      code: 'ht',
      rawValue: 10,
      modificatorManager: new ModificatorManager(),
      typePriority: 1,
    };
  }
}
