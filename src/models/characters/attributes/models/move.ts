import { ModificatorManager } from '../../../Modificator';
import { AttributeProps, Attributes } from '..';
import { Speed } from './speed';
import { Attribute } from '../attribute';

export class Move extends Attribute {
  speed: Speed;

  constructor(props: AttributeProps, attributes?: Attributes) {
    super(props);
    if (
      !attributes?.collection['speed'] ||
      !(attributes?.collection['speed']! instanceof Speed)
    )
      throw Error('Speed should be defined before move');
    this.speed = attributes.collection['speed'];
  }

  getValue(): number {
    const value = this.props.rawValue + this.getModsValue();
    return Math.floor(this.speed.getValue()) + value;
  }

  getRawValue(): number {
    return Math.floor(this.speed.getValue());
  }

  static getDefaultProps(): AttributeProps {
    return {
      name: 'Move',
      code: 'move',
      rawValue: 0,
      ModificatorManager: new ModificatorManager(),
      typePriority: 1,
    };
  }
}
