import _ from 'lodash';
import { CORE_INPUT_NAME_ENUM, SELECT_ENUMS } from './constants';
import { MultiSelectInput } from './MultiSelect';
import { SelectInput } from './select';
import { TagsInput } from './tags';
import { TextInput } from './text';
import { NumberInput } from './number';
import { TextAreaInput } from './textArea';
import { NodesEditorContainer } from './node';
import { EventsContainer } from './events/eventsContainer';

type Props = {
  type: string;
  name: string;
  data: { [index: string]: { [index: string]: any } };
  selectedEntity: { [index: string]: any };
  selectedType: string;
  onDataChanged: (type: string, value: any) => void;
  onNodesChanged: (nodes: any) => void;
};

export const INPUT_TYPES: {
  [index: string]: (props: any) => JSX.Element;
} = {
  string: TextInput,
  text: TextAreaInput,
  number: NumberInput,
  attr: SelectInput,
  diff: SelectInput,
  itemZoneSelect: MultiSelectInput,
  boolean: SelectInput,
  status: MultiSelectInput,
  options: MultiSelectInput,
  tags: TagsInput,
  nodeSelect: SelectInput,
  nodeType: SelectInput,
  nodes: NodesEditorContainer,
  event: EventsContainer,
};

export function AttrInput(props: Props) {
  const {
    name,
    type,
    selectedEntity,
    onDataChanged,
    data,
    selectedType,
    onNodesChanged,
  } = props;
  const list = getList(props);
  const params = {
    path: [],
    events: selectedEntity[name],
    selectedType,
    onDataChanged,
    onNodesChanged,
    selectedEntity,
    value: selectedEntity[name],
    data,
    name,
    type,
    list,
  };
  let input: JSX.Element;
  if (type === 'event') {
    input = INPUT_TYPES[type]({
      params: {
        ...params,
        onDataChanged: (path: string[], newValue: any) => {
          const newEntity = _.set([...selectedEntity[name]], path, newValue);
          if (!path.length) {
            onDataChanged(name, newValue);
            return;
          }
          onDataChanged(name, newEntity);
        },
      },
    });
  } else {
    input = INPUT_TYPES[type](params);
  }
  return (
    <div>
      {CORE_INPUT_NAME_ENUM.some(t => t === name) && (
        <div>
          <label>{name}</label>
        </div>
      )}
      <div>{input}</div>
    </div>
  );
}

function getList(
  props: Props
): string[] | boolean[] | { key: string; value: string }[] {
  const { type, selectedEntity, name } = props;
  if (type === 'nodeSelect') return selectedEntity['nodes'];
  return SELECT_ENUMS[type];
}
