import _ from 'lodash';
import { Paper } from '@mui/material';
import { tagInputsParams } from '../tags';
import { EventAction } from '../../../../core/managers/tag/models/tag';
import { EventInput } from './event';
import IconButton from '@mui/material/Button';
import { Remove } from '@mui/icons-material';
import Plus from '@mui/icons-material/Add';

type props = tagInputsParams & {
  events: EventAction[];
  name: string;
};

export const EventsContainer = ({ params }: { params: props }) => {
  const { events, path, name, onDataChanged } = params;

  const removeEvent = (index: number) => {
    const currentEvents = [...events];
    delete currentEvents[index];
    onDataChanged([...path], currentEvents.filter(Boolean));
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
      {events.map((event, index) => {
        return (
          <EventInput
            key={`event_${path.join('_')}_${index}`}
            params={{
              ...params,
              path: [...params.path, index + ''],
              event,
              removeEvent: () => removeEvent(index),
            }}
          />
        );
      })}
    </Paper>
  );
};

const Buttons = ({ params }: { params: props }) => {
  const { path, events, onDataChanged } = params;
  const addNewEvents = () => {
    onDataChanged(path, [...events, { type: '', effect: [] }]);
  };

  const removeEvents = () => {};

  return (
    <>
      <IconButton
        onClick={() => addNewEvents()}
        size="small"
        style={{ minWidth: 10 }}
      >
        <Plus fontSize="inherit" />
      </IconButton>
      <IconButton
        onClick={() => removeEvents()}
        size="small"
        style={{ minWidth: 10 }}
      >
        <Remove fontSize="inherit" />
      </IconButton>
    </>
  );
};
