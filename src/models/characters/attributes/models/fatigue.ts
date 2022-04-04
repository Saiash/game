import { ModificatorManager } from '../../../Modificator';
import { AttributeProps, Attributes } from '..';
import { Attribute } from '../attribute';
import { Health } from './health';

export class Fatigue extends Attribute {
  health: Health;

  constructor(props: AttributeProps, attributes?: Attributes) {
    super(props);
    if (!attributes?.collection['ht'])
      throw Error('Health should be defined before fatigue');
    this.health = attributes.collection['ht'];
  }

  getValue(): number {
    const value = this.props.rawValue + this.getModsValue();
    return this.health.getValue() + value;
  }

  getRawValue(): number {
    return this.health.getValue();
  }

  static getDefaultProps(): AttributeProps {
    return {
      name: 'Fatigue',
      code: 'ft',
      rawValue: 0,
      ModificatorManager: new ModificatorManager(),
      typePriority: 1,
    };
  }
}
