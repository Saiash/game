import { Attributes, AttributeProps, CheckResults } from './';

export class Attribute {
  props: AttributeProps;

  constructor(props: AttributeProps, attributes?: Attributes) {
    this.props = props;
  }

  getValue(): number {
    let value = this.props.rawValue;
    this.props.mods.forEach(mod => {
      value += mod.value;
    });
    return value;
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
      mods: [],
    };
  }

  getRaw() {}

  initFromRaw() {}
}
