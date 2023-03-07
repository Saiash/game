import { ModificatorManager } from '../../../../../core/managers/ModificatorManager';
import { AttributeProps, AttributeManager } from '..';
import { Attribute } from '../attribute';
import { Health } from './health';
import { CTX } from '../../../../../types';
import { Character } from '../..';

export class Fatigue extends Attribute {
  health: Health;

  constructor({
    ctx,
    props,
    attributeManager,
    character,
  }: {
    ctx: CTX;
    props: AttributeProps;
    character: Character;
    attributeManager?: AttributeManager;
  }) {
    super({ ctx, props, attributeManager, character });
    if (!attributeManager?.collection['ht'])
      throw Error('Health should be defined before fatigue');
    this.health = attributeManager.collection['ht'];
  }

  getValue(): number {
    const value = this.props.rawValue + this.getModsValue();
    return this.health.getValue() + value;
  }

  getRawValue(): number {
    return this.health.getValue();
  }

  static getDefaultProps(): AttributeProps {
    return {
      name: 'Fatigue',
      code: 'ft',
      rawValue: 0,
      modificatorManager: new ModificatorManager(),
      typePriority: 1,
    };
  }
}
