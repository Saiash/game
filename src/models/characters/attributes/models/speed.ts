import { ModificatorManager } from '../../../Modificator';
import { AttributeProps, Attributes } from '..';
import { Health } from './health';
import { Dexterity } from './dexterity';
import { Attribute } from '../attribute';
import { CTX } from '../../../../types';
import { Character } from '../..';

export class Speed extends Attribute {
  health: Health;
  dexterity: Dexterity;

  constructor({
    ctx,
    props,
    attributes,
    character,
  }: {
    ctx: CTX;
    props: AttributeProps;
    character: Character;
    attributes?: Attributes;
  }) {
    super({ ctx, props, attributes, character });
    if (!attributes?.collection['dex'])
      throw Error('Dex should be defined before speed');
    if (!attributes?.collection['ht'])
      throw Error('Health should be defined before speed');
    this.health = attributes.collection['ht'];
    this.dexterity = attributes.collection['dex'];
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
      ModificatorManager: new ModificatorManager(),
      typePriority: 1,
    };
  }
}
