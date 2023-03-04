import { Paper } from '@mui/material';
import { printTagsParams } from './';
import { TagInput as TagInputType } from '../../../../core/managers/tag/models/tag';
import { ConditionsContainer } from '../conditions/conditionsContainer';
import { EventsContainer } from '../events/eventsContainer';
import { SelectInput } from '../select';
import {
  ACTIONS_ENUM,
  ATTRS_ENUM,
  CONDITIONS_ENUM,
  EVENTS_ENUM,
  GENERAL_TAG_TYPES_ENUM,
  MOD_TYPES_ENUM,
} from '../constants';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { NumberInput } from '../number';
import { Remove } from '@mui/icons-material';
import IconButton from '@mui/material/Button';

export type props = printTagsParams & {
  tag: TagInputType;
  removeTag: () => void;
};

const tagCoreFields = {
  action: ['name', 'value'],
  mod: ['modType', 'modTarget', 'value'],
  skill: ['name', 'value'],
};

const additionalContainers = {
  conditions: ConditionsContainer,
  outerConditions: ConditionsContainer,
  onFail: EventsContainer,
  onSuccess: EventsContainer,
};

export const TagInput = ({ props }: { props: props }) => {
  const { path, tag, onDataChanged, data, removeTag } = props;

  const handleTypeChange = (path: string[], value: string) => {
    const fieldsToCopy = [...EVENTS_ENUM, ...CONDITIONS_ENUM];
    let _tag: any = { type: value };
    fieldsToCopy.forEach(field => {
      const _field = field as 'conditions';
      _tag[_field] = tag[_field];
    });
    if (value === 'mod') {
      _tag = { ..._tag, modType: '', modTarget: '', value: 0 };
    } else {
      _tag = { ..._tag, name: '', value: 0 };
    }
    onDataChanged(path, _tag);
  };

  return (
    <div key={`tagOuter_${path.join('_')}`}>
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
          Tag
          <IconButton
            onClick={() => removeTag()}
            size="small"
            style={{ minWidth: 10 }}
          >
            <Remove fontSize="inherit" />
          </IconButton>
        </div>
        <div key={`tagInner_${path.join('_')}`}>
          <div>
            <SelectInput
              name={'Type'}
              list={GENERAL_TAG_TYPES_ENUM}
              value={tag.type}
              onDataChanged={(type, value) => handleTypeChange(path, value)}
            />
          </div>
          <PrintCoreFields
            tag={tag}
            handleChange={onDataChanged}
            path={path}
            data={data}
          />
        </div>
        {Object.keys(additionalContainers).map((key, innderIndex) => {
          const _key = key as 'conditions';
          if (!tag[_key]) return;
          return (
            <div key={`container_${path.join('_')}_${innderIndex}`}>
              {additionalContainers[_key]({
                params: {
                  ...props,
                  ...(['conditions', 'outerConditions'].some(k => k === _key)
                    ? { conditions: tag[_key] }
                    : { events: tag[_key], conditions: [] }),
                  path: [...props.path, _key],
                  name: _key,
                },
              })}
            </div>
          );
        })}
        <PrintTagButtons tag={tag} handleChange={onDataChanged} path={path} />
      </Paper>
    </div>
  );
};

const PrintTagButtons = ({
  tag,
  handleChange,
  path,
}: {
  tag: TagInputType;
  handleChange: (path: string[], value: any) => void;
  path: string[];
}) => {
  const effect = [{ type: '', effect: [] }];
  const condition = [{ and: [{ status: [] }] }];

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      key={`stack_${path.join('_')}`}
    >
      {Object.keys(additionalContainers).map((key, buttonIndex) => {
        const _key = key as 'conditions';
        if (tag[_key]) return;
        return (
          <Button
            key={`tag_button_${path.join('_')}_${buttonIndex}`}
            variant="outlined"
            size="small"
            onClick={() => {
              handleChange(path, {
                ...tag,
                [key]: ['conditions', 'outerConditions'].some(k => k === key)
                  ? condition
                  : effect,
              });
            }}
          >
            Add {key}
          </Button>
        );
      })}
    </Stack>
  );
};

const PrintCoreFields = ({
  tag,
  handleChange,
  path,
  data,
}: {
  tag: TagInputType;
  handleChange: (path: string[], value: any) => void;
  path: string[];
  data: any;
}) => {
  const tagType = tag['type'] as 'action';
  const keyFields = tagCoreFields[tagType];

  const handleInputChange = (key: string, value: string | number) => {
    handleChange(path, { ...tag, [key]: value });
  };

  return (
    <div key={`tag_input_${path.join('_')}`}>
      {keyFields.map((key, keyIndex) => {
        const value = tag[key as 'value'];
        if (key === 'value') {
          return (
            <div key={`tag_input_${path.join('_')}_${keyIndex}`}>
              <NumberInput
                value={value}
                name={key}
                onDataChanged={(type, value) => handleInputChange(key, value)}
              />
            </div>
          );
        }
        const list = getListByType(key, tag, data);
        return (
          <div key={`tag_input_${path.join('_')}_${keyIndex}`}>
            <SelectInput
              onDataChanged={(type, value) => handleInputChange(key, value)}
              value={value as unknown as string}
              name={key}
              list={list}
            />
          </div>
        );
      })}
    </div>
  );
};

const getListByType = (
  key: string,
  tag: any,
  data: props['data']
): string[] => {
  if (key === 'modType') return MOD_TYPES_ENUM;
  if (key === 'modTarget') {
    if (tag['modType'] === 'attribute') return ATTRS_ENUM;
    if (tag['modType'] === 'skill') return Object.keys(data['skills']);
  }
  if (key === 'name') {
    if (tag['type'] === 'skill') return Object.keys(data['skills']);
    if (tag['type'] === 'action') return ACTIONS_ENUM;
  }
  return [];
};
