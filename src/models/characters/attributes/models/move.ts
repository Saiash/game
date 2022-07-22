import { ModificatorManager } from '../../../Modificator';
import { AttributeProps, Attributes } from '..';
import { Speed } from './speed';
import { Attribute } from '../attribute';
import { CTX } from '../../../../types';
import { Character } from '../..';
import { Weight } from '../../secondaryAttributes/models/weight';

export class Move extends Attribute {
  speed: Speed;

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
    if (
      !attributes?.collection['speed'] ||
      !(attributes?.collection['speed']! instanceof Speed)
    )
      throw Error('Speed should be defined before move');
    this.speed = attributes.collection['speed'];
  }

  getValue(): number {
    const value = this.props.rawValue + this.getModsValue();
    const encumbrance = (
      this.character.secondaryAttributes.getByCode('weight') as Weight
    ).encumbrance();
    return Math.max(
      ...[
        Math.floor(this.speed.getValue() * (1 - encumbrance * 0.2)) + value,
        1,
      ]
    );
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
