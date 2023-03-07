import { AttributeProps, AttributeManager } from '..';
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
    attributeManager,
  }: {
    ctx: CTX;
    props: AttributeProps;
    character: Character;
    attributeManager?: AttributeManager;
  }) {
    super({ ctx, props, attributeManager, character });
    if (!attributeManager?.collection['int'])
      throw Error('Inteligence should be defined before will');
    this.inteligence = attributeManager.collection['int'];
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
