import { Paper } from '@mui/material';
import {
  conditions,
  condition,
} from '../../../../core/managers/tag/models/condition';
import { tagInputsParams } from '../tags';
import {
  CONDITIONS_LORE_VALUES_ENUM,
  CONDITIONS_OPTIONS_ENUM,
  CONDITIONS_VALUES_ENUM,
  SELECT_ENUMS,
} from '../constants';
import { SelectInput } from '../select';
import { MultiSelectInput } from '../MultiSelect';
import { Remove } from '@mui/icons-material';
import Plus from '@mui/icons-material/Add';
import IconButton from '@mui/material/Button';

type props = tagInputsParams & {
  conditions: conditions;
  name: string;
  removeOperand: () => void;
};

export const ConditionInput = ({ params }: { params: props }) => {
  const { path, conditions, onDataChanged, data, removeOperand } = params;
  const operandValue = conditions.and ? 'and' : 'or';
  const statements = conditions[operandValue] as condition[];

  const changeOperand = (type: string, value: any) => {
    const index = parseInt(path[path.length - 1]);
    const newValue = { [value]: conditions[operandValue] };
    onDataChanged(path, newValue);
  };

  const onTypeChange = (type: string, value: any, index: number) => {
    onDataChanged([...path, operandValue, index + ''], { [value]: [] });
  };

  const onValueChange = (type: string, value: any, index: number) => {
    const [currentType] = Object.keys(statements[index]);
    onDataChanged([...path, operandValue, index + ''], {
      [currentType]: value,
    });
  };

  const removeCondition = (index: number) => {
    const currentConditions = [...statements];
    delete currentConditions[index];
    onDataChanged([...path, operandValue], currentConditions.filter(Boolean));
  };

  const addNewCondition = () => {
    onDataChanged([...path, operandValue], [...statements, { status: [] }]);
  };

  return (
    <>
      <SelectInput
        name={'Operand'}
        list={CONDITIONS_OPTIONS_ENUM}
        value={operandValue}
        onDataChanged={(type: string, value: any) => changeOperand(type, value)}
      />
      <IconButton
        onClick={() => removeOperand()}
        size="small"
        style={{ minWidth: 10, marginTop: 17 }}
      >
        <Remove fontSize="inherit" />
      </IconButton>
      <IconButton
        onClick={() => addNewCondition()}
        size="small"
        style={{ minWidth: 10, marginTop: 17 }}
      >
        <Plus fontSize="inherit" />
      </IconButton>
      {statements.map((statement, index) => {
        const [key] = Object.keys(statement);
        return (
          <div
            style={{ marginLeft: 30 }}
            key={`conditionInput_${path.join('_')}_${index}`}
          >
            <SelectInput
              name={'Type'}
              list={CONDITIONS_VALUES_ENUM}
              value={key}
              onDataChanged={(type: string, value: any) =>
                onTypeChange(type, value, index)
              }
            />
            <MultiSelectInput
              name={key}
              list={getConditionsList(key, data)}
              value={statement[key]}
              onDataChanged={(type: string, value: any) =>
                onValueChange(type, value, index)
              }
            />
            <IconButton
              onClick={() => removeCondition(index)}
              size="small"
              style={{ minWidth: 10, marginTop: 17 }}
            >
              <Remove fontSize="inherit" />
            </IconButton>
          </div>
        );
      })}
    </>
  );
};

const getConditionsList = (
  key: string,
  data: props['data']
): string[] | boolean[] | { key: string; value: string }[] => {
  if (key === 'notStatus') key = 'status';
  if (SELECT_ENUMS[key]) return SELECT_ENUMS[key];
  if (CONDITIONS_LORE_VALUES_ENUM.some(s => s === key)) {
    return Object.keys(data.lore);
  }
  if (key === 'lastAction') {
    return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  }
  return [];
};
