import _ from 'lodash';
import { tagInputsParams } from '../tags';
import {
  EFFECTS_TAG_TYPES_ENUM,
  SELECT_ENUMS,
  STATUS_TYPES_EFFECTS_ENUM,
} from '../constants';
import { SelectInput } from '../select';
import { MultiSelectInput } from '../MultiSelect';
import { Remove, AddLink } from '@mui/icons-material';
import IconButton from '@mui/material/Button';
import {
  EventAction,
  TagInput,
} from '../../../../core/managers/tag/models/tag';
import { TextAreaInput } from '../textArea';
import { ConditionsContainer } from '../conditions/conditionsContainer';
import { TagInput as TagInputComponent } from '../tags/tag';

type props = tagInputsParams & {
  event: EventAction;
  removeEvent: () => void;
};

export const EventInput = ({ params }: { params: props }) => {
  const { path, event, onDataChanged, data, removeEvent } = params;

  const onTypeChange = (type: string, value: any) => {
    let effect: any = [];
    if (value === 'addTag') {
      effect = { type: 'mod' };
    }
    onDataChanged(path, { type: value, effect });
  };

  const onValueChange = (type: string, value: any) => {
    const currentValue = event;
    onDataChanged(path, { ...currentValue, effect: value });
  };

  const addCondition = () => {
    const currentValue = event;
    onDataChanged(path, { ...currentValue, conditions: [] });
  };

  return (
    <>
      <div>
        <SelectInput
          name={'Type'}
          list={EFFECTS_TAG_TYPES_ENUM}
          value={event.type}
          onDataChanged={(type: string, value: any) =>
            onTypeChange(type, value)
          }
        />
        {['sendMessage', 'addTag'].every(type => type !== event.type) && (
          <MultiSelectInput
            name={event.type}
            list={getEventsList(event.type, data)}
            value={event.effect as string[]}
            onDataChanged={(type: string, value: any) =>
              onValueChange(type, value)
            }
          />
        )}
        {event.type === 'sendMessage' && (
          <TextAreaInput
            name={'Message'}
            value={event.effect as string}
            onDataChanged={(type: string, value: any) =>
              onValueChange(type, value)
            }
          ></TextAreaInput>
        )}
        {event.type === 'addTag' && (
          <TagInputComponent
            key={`addTag_tag_`}
            props={{
              removeTag: () => {},
              path: path,
              data,
              onDataChanged: (path: string[], value: any) => {
                onValueChange('path', value);
              },
              handleAddNewTag: () => {},
              tag: event.effect as TagInput,
            }}
          ></TagInputComponent>
        )}
        <IconButton
          onClick={() => removeEvent()}
          size="small"
          style={{ minWidth: 10, marginTop: 17 }}
        >
          <Remove fontSize="inherit" />
        </IconButton>
        <IconButton
          onClick={() => addCondition()}
          size="small"
          style={{ minWidth: 10, marginTop: 17 }}
        >
          <AddLink fontSize="inherit" />
        </IconButton>
      </div>
      {event.conditions && (
        <ConditionsContainer
          params={{
            ...params,
            conditions: event.conditions,
            path: [...params.path, 'conditions'],
            name: 'conditions',
          }}
        />
      )}
      {event.outerConditions && (
        <ConditionsContainer
          params={{
            ...params,
            conditions: event.outerConditions,
            path: [...params.path, 'outerConditions'],
            name: 'outerConditions',
          }}
        />
      )}
    </>
  );
};

const getEventsList = (
  key: string,
  data: props['data']
): string[] | boolean[] | { key: string; value: string }[] => {
  if (STATUS_TYPES_EFFECTS_ENUM.some(s => s === key)) {
    return SELECT_ENUMS['status'];
  }
  if (key === 'addLore') {
    return Object.keys(data.lore);
  }
  if (key === 'triggerEvent') {
    return Object.keys(data.actionEvent);
  }
  return [];
};
