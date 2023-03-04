import { AttributeProps, Attributes } from '..';
import { Inteligence } from './inteligence';
import { Attribute } from '../attribute';
import { ModificatorManager } from '../../../../../core/managers/ModificatorManager';
import { CTX } from '../../../../../types';
import { Character } from '../..';

export class Will extends Attribute {
  inteligence: Inteligence;

  constructor({
    ctx,
    props,
    character,
    attributes,
  }: {
    ctx: CTX;
    props: AttributeProps;
    character: Character;
    attributes?: Attributes;
  }) {
    super({ ctx, props, attributes, character });
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
      modificatorManager: new ModificatorManager(),
      typePriority: 1,
    };
  }
}
