import { ModificatorManager } from '../../../../../core/managers/ModificatorManager';
import { AttributeProps } from '../';
import { Attribute } from '../attribute';

export class Strength extends Attribute {
  static getDefaultProps(): AttributeProps {
    return {
      name: 'Strength',
      code: 'str',
      rawValue: 10,
      modificatorManager: new ModificatorManager(),
      typePriority: 0,
    };
  }
}
