import { ModificatorManager } from '../../../../../core/managers/ModificatorManager';
import { AttributeProps } from '../';
import { Attribute } from '../attribute';

export class Dexterity extends Attribute {
  static getDefaultProps(): AttributeProps {
    return {
      name: 'Dexterity',
      code: 'dex',
      rawValue: 10,
      modificatorManager: new ModificatorManager(),
      typePriority: 0,
    };
  }
}
