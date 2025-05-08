import { AttributeManager } from '..';
import { DataStore } from '../../../../engine/models/store/store';
import { ResolveResult } from '../../skills/types';
import { Attribute } from '../attribute';

export class Weight extends Attribute {
  private attributeManager: AttributeManager;

  constructor(store: DataStore, attributeManager: AttributeManager) {
    super(store, ['weight']);
    this.attributeManager = attributeManager;
  }

  initDefaultValues() {
    this.setName('Weight');
    this.setModificationValue(0);
  }

  calculateMaxVal(): number {
    return Math.pow(this.getStrValue(), 2) + this.getModsValue();
  }

  upliftWeight(weight: number): ResolveResult {
    if (weight > this.basicWeight() * 8 - this.getValue())
      return {
        executed: true,
        checkResult: {
          result: false,
          rand: 0,
          value: 0,
          difficulty: 0,
          successMargin: 0,
        },
        message: 'Слишком тяжело!',
      };
    //TODO: add time spent to action manager
    // this.ctx.gameData.timeManager.calcTimeSpent(
    //   Math.floor(weight / this.basicWeight())
    // );
    return {
      executed: true,
      checkResult: {
        result: true,
        rand: 0,
        value: 0,
        difficulty: 0,
        successMargin: 0,
      },
      message: `Успешно!`,
    };
  }

  basicWeight(): number {
    return Math.pow(this.getStrValue(), 2) / 5;
  }

  private getStrValue() {
    return this.attributeManager.getByCode('str').getValue();
  }
}
