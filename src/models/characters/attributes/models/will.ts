import { AttributeProps, Attributes } from '..';
import { Inteligence } from './inteligence';
import { Attribute } from '../attribute';
import { ModificatorManager } from '../../../Modificator';

export class Will extends Attribute {
  inteligence: Inteligence;

  constructor(props: AttributeProps, attributes?: Attributes) {
    super(props);
    if (!attributes?.collection['int'])
      throw Error('Inteligence should be defined before will');
    this.inteligence = attributes.collection['int'];
  }

  getValue(): number {
    return (
      this.inteligence.getValue() + this.props.rawValue + this.getModsValue()
    );
  }

  getRawValue(): number {
    return this.inteligence.getValue();
  }

  static getDefaultProps(): AttributeProps {
    return {
      name: 'Will',
      code: 'will',
      rawValue: 0,
      ModificatorManager: new ModificatorManager(),
      typePriority: 1,
    };
  }
}
