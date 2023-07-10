import _ from 'lodash';
import { SelectInput } from '../select';
import IconButton from '@mui/material/Button';
import Plus from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import { TagInput as TagInputType } from '../../../../core/managers/tag/models/tag';
import { TagInput } from './tag';
import { GLOBAL_TAG_TYPES_ENUM } from '../constants';

type Props = {
  name: string;
  type: string;
  selectedType: string;
  value: { [index: string]: any }[];
  data: { [index: string]: { [index: string]: any } };
  onDataChanged: (type: string, value: any) => void;
};

export type tagInputsParams = {
  path: string[];
  data: { [index: string]: { [index: string]: any } };
  onDataChanged: (path: string[], value: any) => void;
  removeContainer?: () => void;
};

export type printTagsParams = tagInputsParams & {
  handleAddNewTag: () => void;
};

export function TagsInput(props: Props) {
  const { value, onDataChanged, name, data, selectedType } = props;

  const handleChange = (path: string[], newValue: any) => {
    const newEntity = _.set([...value], path, newValue);
    onDataChanged(name, newEntity);
  };

  const handleAddNewTag = () => {
    const newTag = { type: 'skill', name: '', value: 0 };
    handleChange(['0', 'tags'], [...value[0]['tags'], newTag]);
  };

  const addOuterTag = () => {
    if (name === 'actions') {
      handleChange([], [...value, { type: 'sendMessage', effect: '' }]);
      return;
    }
    onDataChanged(name, [...value, { type: 'self', tags: [] }]);
  };

  const addTag = (index: number) => {
    handleChange(
      [index + '', 'tags'],
      [...value[index]['tags'], { type: 'skill', name: '', value: 0 }]
    );
  };

  const removeTag = (index: number, tagIndex: number) => {
    const _tags = value[index]['tags'];
    delete _tags[tagIndex];
    handleChange([index + '', 'tags'], _tags.filter(Boolean));
  };

  const removeOuterTag = (index: number) => {
    const _tags = [...value];
    delete _tags[index];
    onDataChanged(name, [..._tags.filter(Boolean)]);
  };

  return (
    <div>
      <IconButton
        onClick={() => addOuterTag()}
        size="small"
        style={{ minWidth: 10, marginTop: 17 }}
      >
        <Plus fontSize="inherit" />
      </IconButton>
      {value.map((outerTag, index) => {
        const { tags } = outerTag;
        return (
          <div key={`outer_tag_${index}`}>
            <SelectInput
              name={'Type'}
              list={GLOBAL_TAG_TYPES_ENUM}
              value={outerTag.type}
              onDataChanged={(type, value) =>
                handleChange([index + '', 'type'], value)
              }
            />
            <IconButton
              onClick={() => addTag(index)}
              size="small"
              style={{ minWidth: 10, marginTop: 17 }}
            >
              <Plus fontSize="inherit" />
            </IconButton>
            <IconButton
              onClick={() => removeOuterTag(index)}
              size="small"
              style={{ minWidth: 10, marginTop: 17 }}
            >
              <Remove fontSize="inherit" />
            </IconButton>
            {tags.map((_tag: TagInputType, tagIndex: number) => {
              return (
                <TagInput
                  key={`tag_${tagIndex}`}
                  props={{
                    removeTag: () => removeTag(index, tagIndex),
                    path: [index + '', 'tags', tagIndex + ''],
                    data,
                    onDataChanged: handleChange,
                    handleAddNewTag,
                    tag: _tag,
                  }}
                ></TagInput>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
