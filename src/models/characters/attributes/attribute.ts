import { ModificatorManager } from '../../Modificator';
import { Attributes, AttributeProps, CheckResults } from './';

export class Attribute {
  props: AttributeProps;

  constructor(props: AttributeProps, attributes?: Attributes) {
    this.props = props;
  }

  getName(): string {
    return this.props.name;
  }

  getValue(): number {
    let value = this.props.rawValue;
    return value + this.getModsValue();
  }

  getModsValue(): number {
    return this.props.ModificatorManager.getValue();
  }

  getRawValue(): number {
    return this.props.rawValue;
  }

  check(difficulty: number): CheckResults {
    const rand = Math.round(
      Math.random() * 5 + Math.random() * 5 + Math.random() * 5 + 3
    );
    const result = rand <= this.getValue() - difficulty;
    return { rand, value: this.getValue(), result };
  }

  static getDefaultProps(): AttributeProps {
    return {
      name: '',
      code: '',
      rawValue: 10,
      ModificatorManager: new ModificatorManager(),
      typePriority: 0,
    };
  }

  getRaw() {}

  initFromRaw() {}
}
