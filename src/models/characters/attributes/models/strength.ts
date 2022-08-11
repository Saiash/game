import { ModificatorManager } from '../../../Modificator';
import { AttributeProps } from '../';
import { Attribute } from '../attribute';
import { CTX } from '../../../../types';

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
