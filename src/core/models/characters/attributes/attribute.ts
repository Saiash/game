import { Character } from '..';
import { CTX } from '../../../../types';
import { ModificatorManager } from '../../../../core/managers/ModificatorManager';
import { AttributeManager, AttributeProps } from './';
import { CheckResults } from '../../skills/types';
import { throwDices } from '../../../utils/diceThrower';

export class Attribute {
  props: AttributeProps;
  attributeManager: AttributeManager | null;
  character: Character;
  ctx: CTX;

  constructor({
    props,
    ctx,
    character,
    attributeManager,
  }: {
    props: AttributeProps;
    character: Character;
    attributeManager?: AttributeManager;
    ctx: CTX;
  }) {
    this.attributeManager = attributeManager || null;
    this.props = props;
    this.ctx = ctx;
    this.character = character;
  }

  getName(): string {
    return this.props.name;
  }

  getValue(): number {
    let value = this.props.rawValue;
    return value + this.getModsValue();
  }

  getModsValue(): number {
    return this.props.modificatorManager.getValue();
  }

  getRawValue(): number {
    return this.props.rawValue;
  }

  check(difficulty: number = 0): CheckResults {
    const rand = throwDices(3, 6);
    const result = rand <= this.getValue() + difficulty;
    const successMargin = rand - this.getValue() + difficulty;
    return { rand, value: this.getValue(), result, difficulty, successMargin };
  }

  static getDefaultProps(): AttributeProps {
    return {
      name: '',
      code: '',
      rawValue: 10,
      modificatorManager: new ModificatorManager(),
      typePriority: 0,
    };
  }

  getRaw() {}

  initFromRaw() {}

  showValue() {
    let text;
    const attrValue = this.getValue();
    switch (attrValue) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
      case 19:
      case 20:
      case 21:
      case 22:
      case 23:
      case 24:
        break;

      default:
        break;
    }
    return text;
  }
}
