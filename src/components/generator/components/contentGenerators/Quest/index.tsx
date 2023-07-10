import { Generator as defaultGenerator } from '..';
import { random } from 'lodash';
import { DefaultCombinedGenerator } from '../defaultCombinedGenerator';
import { generator as generatorType } from '../tables';
import { Source_Table } from './tables/source';
import { Problem_Table } from './tables/problem';

const table: { [index: string]: { type: string; options?: string[] } } = {};
const GenName = 'Quest';

export const QuestGenerator = (fields: any) => {
  return (
    Source_Table[random(1, Source_Table.length) - 1] +
    ' -> ' +
    Problem_Table[random(1, Problem_Table.length) - 1] +
    ' (WHAT, WHY, WHEN, WHERE, HOW and WHO)'
  );
};

export const Quest = ({
  writeToLog,
}: {
  writeToLog: (result: string) => void;
}) => {
  return DefaultCombinedGenerator({
    table,
    GenName,
    generator: QuestGenerator,
    writeToLog,
  });
};
