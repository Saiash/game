import { AttributeProps } from '../';
import { Attribute } from '../attribute';

export class Strength extends Attribute {
  static getDefaultProps(): AttributeProps {
    return {
      name: 'Strength',
      code: 'str',
      rawValue: 10,
      mods: [],
    };
  }
}
