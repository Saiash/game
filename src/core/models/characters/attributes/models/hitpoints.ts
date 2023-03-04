import { ModificatorManager } from '../../../../../core/managers/ModificatorManager';
import { AttributeProps, Attributes } from '..';
import { Strength } from './strength';
import { Attribute } from '../attribute';
import { CTX } from '../../../../../types';
import { Character } from '../..';

export class Hitpoints extends Attribute {
  strength: Strength;

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
      modificatorManager: new ModificatorManager(),
      typePriority: 1,
    };
  }
}
