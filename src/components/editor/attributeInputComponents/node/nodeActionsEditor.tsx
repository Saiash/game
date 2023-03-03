import _ from 'lodash';
import { IconButton, Paper } from '@mui/material';
import { ConditionsContainer } from '../conditions/conditionsContainer';
import { SelectInput } from '../select';

import { Remove } from '@mui/icons-material';
import Plus from '@mui/icons-material/Add';
import { TextInput } from '../text';
import { EventsContainer } from '../events/eventsContainer';

type params = {
  data: any;
  value: any;
  name: string;
  onDataChanged: (fieldName: string, value: any) => void;
};

export function NodeActionsEditor(params: params) {
  const { value: actions, name, onDataChanged, data } = params;
  const onDataChangedInner = (path: string[], value: any) => {
    let newActions = [...actions];
    if (path.length) {
      newActions = _.set([...actions], path, value);
    } else {
      newActions = value;
    }
    onDataChanged(name, newActions);
  };

  const removeAction = (index: number) => {
    const newArrows = [...actions];
    delete newArrows[index];
    onDataChanged(name, newArrows);
  };

  return (
    <Paper
      className={'tagCore'}
      style={{
        padding: 7,
        marginTop: 0,
        marginLeft: 0,
        marginBottom: 10,
        marginRight: -7,
      }}
      elevation={4}
    >
      <div>
        {name}
        <Buttons params={{ name, actions, onDataChanged }}></Buttons>
      </div>
      {actions.map((action: any, actionIndex: string) => {
        if (!action) return <></>;
        const { conditions, description, resultingActions } = action;
        return (
          <div key={`actionEditor_${actionIndex}`}>
            <TextInput
              name={'description'}
              value={description}
              onDataChanged={(name, value) => {
                onDataChangedInner([actionIndex + '', 'description'], value);
              }}
            />
            <IconButton
              onClick={() => removeAction(parseInt(actionIndex))}
              size="small"
              style={{ minWidth: 10 }}
            >
              <Remove fontSize="inherit" />
            </IconButton>
            <ConditionsContainer
              params={{
                conditions,
                path: [actionIndex + '', 'conditions'],
                name: 'Conditions',
                onDataChanged: onDataChangedInner,
                data,
              }}
            />
            <EventsContainer
              params={{
                events: resultingActions,
                path: [actionIndex + '', 'resultingActions'],
                name: 'resultingActions',
                onDataChanged: onDataChangedInner,
                data,
              }}
            />
          </div>
        );
      })}
    </Paper>
  );
}

const Buttons = ({
  params,
}: {
  params: {
    name: string;
    actions: any;
    onDataChanged: (path: string, newActions: any) => void;
  };
}) => {
  const { name, actions, onDataChanged } = params;

  const addNewAction = () => {
    onDataChanged(name, [
      ...actions,
      { conditions: [], description: '', resultingActions: [] },
    ]);
  };

  return (
    <>
      <IconButton
        onClick={() => addNewAction()}
        size="small"
        style={{ minWidth: 10 }}
      >
        <Plus fontSize="inherit" />
      </IconButton>
    </>
  );
};
