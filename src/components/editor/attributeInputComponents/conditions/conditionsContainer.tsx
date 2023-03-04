import _ from 'lodash';
import { Paper } from '@mui/material';
import { tagInputsParams } from '../tags';
import { conditions } from '../../../../core/managers/tag/models/condition';
import { ConditionInput } from './condition';
import IconButton from '@mui/material/Button';
import { Remove } from '@mui/icons-material';
import Plus from '@mui/icons-material/Add';

type props = tagInputsParams & {
  conditions: conditions[];
  name: string;
};

export const ConditionsContainer = ({ params }: { params: props }) => {
  const { conditions, path, name, onDataChanged } = params;

  const removeOperand = (index: number) => {
    const currentConditions = [...conditions];
    delete currentConditions[index];
    onDataChanged([...path], currentConditions.filter(Boolean));
  };

  return (
    <Paper
      className={'tagCore'}
      style={{
        padding: 7,
        marginTop: 0,
        marginLeft: 0,
        marginBottom: 10,
        marginRight: -7 * Math.floor(path.length / 2),
      }}
      elevation={4}
    >
      <div>
        {name}
        <Buttons params={params}></Buttons>
      </div>
      {conditions.map((conditions, index) => {
        return (
          <ConditionInput
            key={`condition_${path.join('_')}_${index}`}
            params={{
              ...params,
              path: [...params.path, index + ''],
              conditions,
              removeOperand: () => removeOperand(index),
            }}
          />
        );
      })}
    </Paper>
  );
};

const Buttons = ({ params }: { params: props }) => {
  const { path, conditions, onDataChanged } = params;
  const addNewConditions = () => {
    onDataChanged(path, [...conditions, { and: [] }]);
  };

  const removeConditions = () => {};

  return (
    <>
      <IconButton
        onClick={() => addNewConditions()}
        size="small"
        style={{ minWidth: 10 }}
      >
        <Plus fontSize="inherit" />
      </IconButton>
      <IconButton
        onClick={() => removeConditions()}
        size="small"
        style={{ minWidth: 10 }}
      >
        <Remove fontSize="inherit" />
      </IconButton>
    </>
  );
};
