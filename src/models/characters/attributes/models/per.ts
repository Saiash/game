import { ModificatorManager } from '../../../Modificator';
import { AttributeProps, Attributes } from '..';
import { Inteligence } from './inteligence';
import { Attribute } from '../attribute';
import { CTX } from '../../../../types';

export class Perception extends Attribute {
  inteligence: Inteligence;

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
    if (!attributes?.collection['int'])
      throw Error('Inteligence should be defined before per');
    this.inteligence = attributes.collection['int'];
  }

  getValue(): number {
    const value = this.props.rawValue + this.getModsValue();
    return this.inteligence.getValue() + value;
  }

  getRawValue(): number {
    return this.inteligence.getValue();
  }

  static getDefaultProps(): AttributeProps {
    return {
      name: 'Perception',
      code: 'per',
      rawValue: 0,
      ModificatorManager: new ModificatorManager(),
      typePriority: 1,
    };
  }
}
