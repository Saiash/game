import _ from 'lodash';
import { EventsContainer } from '../events/eventsContainer';

type params = {
  data: any;
  value: any;
  name: string;
  onDataChanged: (fieldName: string, value: any) => void;
};

export function NodeContentEditor(params: params) {
  const { value: events, name, onDataChanged, data } = params;
  const onDataChangedInner = (path: string[], value: any) => {
    let newEvents = [...events];
    if (path.length) {
      newEvents = _.set([...events], path, value);
    } else {
      newEvents = value;
    }
    onDataChanged(name, newEvents);
  };

  return (
    <>
      <EventsContainer
        params={{
          events,
          path: [],
          name,
          onDataChanged: onDataChangedInner,
          data,
        }}
      />
    </>
  );
}
