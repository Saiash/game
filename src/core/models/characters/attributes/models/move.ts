import { ModificatorManager } from '../../../../../core/managers/ModificatorManager';
import { AttributeProps, AttributeManager } from '..';
import { Speed } from './speed';
import { Attribute } from '../attribute';
import { CTX } from '../../../../../types';
import { Character } from '../..';
import { Weight } from '../../secondaryAttributes/models/weight';

export class Move extends Attribute {
  speed: Speed;

  constructor({
    ctx,
    props,
    character,
    attributeManager,
  }: {
    ctx: CTX;
    props: AttributeProps;
    character: Character;
    attributeManager?: AttributeManager;
  }) {
    super({ ctx, props, attributeManager, character });
    if (
      !attributeManager?.collection['speed'] ||
      !(attributeManager?.collection['speed']! instanceof Speed)
    )
      throw Error('Speed should be defined before move');
    this.speed = attributeManager.collection['speed'];
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

  getSwimingValue(): number {
    return Math.max(...[this.getValue() / 5, 1]);
  }

  getRawValue(): number {
    return Math.floor(this.speed.getValue());
  }

  static getDefaultProps(): AttributeProps {
    return {
      name: 'Move',
      code: 'move',
      rawValue: 0,
      modificatorManager: new ModificatorManager(),
      typePriority: 1,
    };
  }
}
