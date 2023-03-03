import _ from 'lodash';
import { IconButton, Paper } from '@mui/material';
import { ConditionsContainer } from '../conditions/conditionsContainer';
import { SelectInput } from '../select';

import { Remove } from '@mui/icons-material';
import Plus from '@mui/icons-material/Add';

type params = {
  sceneNodes: string[];
  data: any;
  value: any;
  name: string;
  onDataChanged: (fieldName: string, value: any) => void;
};

export function NodeArrowsEditor(params: params) {
  const { value: arrows, name, onDataChanged, data, sceneNodes } = params;
  const onDataChangedInner = (path: string[], value: any) => {
    let newArrows = [...arrows];
    if (path.length) {
      newArrows = _.set([...arrows], path, value);
    } else {
      newArrows = value;
    }
    onDataChanged(name, newArrows);
  };

  const removeArrow = (index: number) => {
    const newArrows = [...arrows];
    delete newArrows[index];
    onDataChanged(name, newArrows.filter(Boolean));
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
        <Buttons params={{ name, arrows, onDataChanged }}></Buttons>
      </div>
      {arrows.map((arrow: any, arrowIndex: string) => {
        if (!arrow) return <></>;
        const { conditions, nextNodeId } = arrow;
        return (
          <div key={`arrowEditor_${arrowIndex}`}>
            <SelectInput
              name={'nextNodeId'}
              value={nextNodeId}
              list={sceneNodes}
              onDataChanged={(name, value) => {
                onDataChangedInner([arrowIndex + '', 'nextNodeId'], value);
              }}
            />
            <IconButton
              onClick={() => removeArrow(parseInt(arrowIndex))}
              size="small"
              style={{ minWidth: 10 }}
            >
              <Remove fontSize="inherit" />
            </IconButton>
            <ConditionsContainer
              params={{
                conditions,
                path: [arrowIndex + '', 'conditions'],
                name: 'Conditions',
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
    arrows: any;
    onDataChanged: (path: string, newArrows: any) => void;
  };
}) => {
  const { name, arrows, onDataChanged } = params;

  const addNewArrow = () => {
    onDataChanged(name, [...arrows, { nextNodeId: '', conditions: [] }]);
  };

  return (
    <>
      <IconButton
        onClick={() => addNewArrow()}
        size="small"
        style={{ minWidth: 10 }}
      >
        <Plus fontSize="inherit" />
      </IconButton>
    </>
  );
};
