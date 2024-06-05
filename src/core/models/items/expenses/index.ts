import { Character } from '../../characters';

export type expensesList =
  | '-2'
  | '-1'
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8';

export const expensesByStatus: Record<expensesList, number> = {
  '-2': 100,
  '-1': 300,
  '0': 600,
  '1': 1200,
  '2': 3000,
  '3': 12000,
  '4': 60000,
  '5': 600000,
  '6': 6000000,
  '7': 60000000,
  '8': 600000000,
};

export class Expenses {
  character: Character;

  constructor({ character }: { character: Character }) {
    this.character = character;
  }
}

//TODO: расходы меньше нужного понижают реакцию окружающих
//TODO: расходы в путешествии дольше месяца (socialGroups / cultures) - дороже в 6 раз
//TODO: Жизнь вне дома - 0.2 среднемесячных расходов в день! но можно на статус ниже
//TODO: Еда вне дома - статус -1, 1.3% месячных
//TODO: спиртное - от 1%
//TODO: Пайки - 5% на неделю?? 14 фунтов вес
//TODO: Гардероб - хотя бы 4 комплекта одежды, ночное, праздничная и зимняя, для работы и хобби. 100% расходов. 20+ фунтов
//TODO: Комеплкт летней одежды - 10%, 1
//TODO: Комеплкт одежды - 20%, 2
//TODO: Зимняя одежда - 30%, 4, позволяет защищатся от потери FP броском HT без штрафа
//TODO: Праздничная - 40%, 2
//TODO: Косметика - 10% запас на месяц, 2 фунта
