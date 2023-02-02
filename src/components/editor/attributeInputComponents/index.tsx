import { CORE_INPUT_NAME_ENUM, SELECT_ENUMS } from './constants';
import { MultiSelectInput } from './MultiSelect';
import { SelectInput } from './select';
import { TagInput } from './tag';
import { TextInput } from './text';
import { NumberInput } from './number';
import { TextAreaInput } from './textArea';

type Props = {
  type: string;
  name: string;
  data: { [index: string]: { [index: string]: any } };
  selectedEntity: { [index: string]: any };
  selectedType: string;
  onDataChanged: (type: string, value: any) => void;
};

const INPUT_TYPES: {
  [index: string]: (props: any) => JSX.Element;
} = {
  string: TextInput,
  text: TextAreaInput,
  number: NumberInput,
  attr: SelectInput,
  diff: SelectInput,
  boolean: SelectInput,
  status: MultiSelectInput,
  options: MultiSelectInput,
  tags: TagInput,
};

export function AttrInput(props: Props) {
  const { name, type, selectedEntity, onDataChanged, data, selectedType } =
    props;
  const input = INPUT_TYPES[type]({
    selectedType,
    onDataChanged,
    selectedEntity,
    value: selectedEntity[name],
    data,
    name,
    type,
    list: SELECT_ENUMS[type],
  });
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
