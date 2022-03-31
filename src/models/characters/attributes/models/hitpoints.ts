import { AttributeProps, Attributes } from '..';
import { Strength } from './strength';
import { Attribute } from '../attribute';

export class Hitpoints extends Attribute {
  strength: Strength;

  constructor(props: AttributeProps, attributes?: Attributes) {
    super(props);
    if (!attributes?.collection['str'])
      throw Error('Str should be defined before HP');
    this.strength = attributes.collection['str'];
  }

  getValue(): number {
    let value = this.props.rawValue;
    this.props.mods.forEach(mod => {
      value += mod.value;
    });
    return this.strength.getValue() + value;
  }

  getRawValue(): number {
    return this.props.rawValue;
  }

  static getDefaultProps(): AttributeProps {
    return {
      name: 'Hitpoints',
      code: 'hp',
      rawValue: 0,
      mods: [],
    };
  }
}
