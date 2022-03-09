import { AttributeProps, Attributes } from '..';
import { Health } from './health';
import { Dexterity } from './dexterity';
import { Attribute } from '../attribute';

export class Speed extends Attribute {
  health: Health;
  dexterity: Dexterity;

  constructor(props: AttributeProps, attributes?: Attributes) {
    super(props);
    if (!attributes?.collection['dex'])
      throw Error('Dex should be defined before speed');
    if (!attributes?.collection['ht'])
      throw Error('Health should be defined before speed');
    this.health = attributes.collection['ht'];
    this.dexterity = attributes.collection['dex'];
  }

  getValue(): number {
    let value = this.props.rawValue;
    this.props.mods.forEach(mod => {
      value += mod.value;
    });
    return (
      this.health.getValue() * 0.25 + this.dexterity.getValue() * 0.25 + value
    );
  }

  getRawValue(): number {
    return this.props.rawValue;
  }

  static getDefaultProps(): AttributeProps {
    return {
      name: 'Speed',
      code: 'speed',
      rawValue: 0,
      mods: [],
    };
  }
}
