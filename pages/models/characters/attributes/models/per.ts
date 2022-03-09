import { AttributeProps, Attributes } from '..';
import { Inteligence } from './inteligence';
import { Attribute } from '../attribute';

export class Perception extends Attribute {
  inteligence: Inteligence;

  constructor(props: AttributeProps, attributes?: Attributes) {
    super(props);
    if (!attributes?.collection['int'])
      throw Error('Inteligence should be defined before per');
    this.inteligence = attributes.collection['int'];
  }

  getValue(): number {
    let value = this.props.rawValue;
    this.props.mods.forEach(mod => {
      value += mod.value;
    });
    return this.inteligence.getValue() + value;
  }

  getRawValue(): number {
    return this.props.rawValue;
  }

  static getDefaultProps(): AttributeProps {
    return {
      name: 'Perception',
      code: 'per',
      rawValue: 0,
      mods: [],
    };
  }
}
