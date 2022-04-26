import { ModificatorManager } from '../../../Modificator';
import { AttributeProps, Attributes } from '..';
import { Strength } from './strength';
import { Attribute } from '../attribute';
import { CTX } from '../../../../types';

export class Hitpoints extends Attribute {
  strength: Strength;

  constructor({
    ctx,
    props,
    attributes,
  }: {
    ctx: CTX;
    props: AttributeProps;
    attributes?: Attributes;
  }) {
    super({ ctx, props, attributes });
    if (!attributes?.collection['str'])
      throw Error('Str should be defined before HP');
    this.strength = attributes.collection['str'];
  }

  getValue(): number {
    const value = this.props.rawValue + this.getModsValue();
    return this.strength.getValue() + value;
  }

  getRawValue(): number {
    return this.strength.getValue();
  }

  static getDefaultProps(): AttributeProps {
    return {
      name: 'Hitpoints',
      code: 'hp',
      rawValue: 0,
      ModificatorManager: new ModificatorManager(),
      typePriority: 1,
    };
  }
}
