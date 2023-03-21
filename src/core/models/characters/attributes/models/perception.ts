import { ModificatorManager } from '../../../../managers/ModificatorManager';
import { AttributeProps, AttributeManager } from '..';
import { Inteligence } from './inteligence';
import { Attribute } from '../attribute';
import { CTX } from '../../../../../types';
import { Character } from '../..';

export class Perception extends Attribute {
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
      throw Error('Inteligence should be defined before per');
    this.inteligence = attributeManager.collection['int'];
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
      modificatorManager: new ModificatorManager(),
      typePriority: 1,
    };
  }
}
