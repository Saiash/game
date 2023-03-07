import { ModificatorManager } from '../../../../../core/managers/ModificatorManager';
import { AttributeProps, AttributeManager } from '..';
import { Health } from './health';
import { Dexterity } from './dexterity';
import { Attribute } from '../attribute';
import { CTX } from '../../../../../types';
import { Character } from '../..';

export class Speed extends Attribute {
  health: Health;
  dexterity: Dexterity;

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
    if (!attributeManager?.collection['dex'])
      throw Error('Dex should be defined before speed');
    if (!attributeManager?.collection['ht'])
      throw Error('Health should be defined before speed');
    this.health = attributeManager.collection['ht'];
    this.dexterity = attributeManager.collection['dex'];
  }

  getValue(): number {
    const value = this.props.rawValue + this.getModsValue();
    return this.getRawValue() + value;
  }

  getRawValue(): number {
    return this.health.getValue() * 0.25 + this.dexterity.getValue() * 0.25;
  }

  static getDefaultProps(): AttributeProps {
    return {
      name: 'Speed',
      code: 'speed',
      rawValue: 0,
      modificatorManager: new ModificatorManager(),
      typePriority: 1,
    };
  }
}
