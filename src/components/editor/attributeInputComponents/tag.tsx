import _ from 'lodash';
import { MultiSelectInput } from './MultiSelect';
import {
  ACTIONS_ENUM,
  EFFECTS_TAG_TYPES_ENUM,
  GENERAL_TAG_TYPES_ENUM,
  GLOBAL_TAG_TYPES_ENUM,
  STATUS_TYPES_EFFECTS_ENUM,
  SELECT_ENUMS,
  RESULTS_ENUM,
  GENERAL_OPTIONS_ENUM,
  CONDITIONS_ENUM,
  CONDITIONS_OPTIONS_ENUM,
  CONDITIONS_VALUES_ENUM,
  NON_STATUS_TYPES_EFFECTS_ENUM,
  CONDITIONS_STATUS_OPTIONS_ENUM,
  CONDITIONS_LORE_VALUES_ENUM,
  MOD_TYPES_ENUM,
  ATTRS_ENUM,
} from './constants';
import { SelectInput } from './select';
import { TextInput } from './text';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/Button';
import Plus from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { NumberInput } from './number';

type Props = {
  name: string;
  type: string;
  selectedType: string;
  value: { [index: string]: any }[];
  data: { [index: string]: { [index: string]: any } };
  onDataChanged: (type: string, value: any) => void;
};

type printTagsParams = {
  tagName: string;
  tags: { [index: string]: any }[];
  previousTag: { [index: string]: any }[];
  selectedType: string;
  index: number;
  depth: number;
  path: string[];
  data: { [index: string]: { [index: string]: any } };
  tagType: string;
  handleChange: (path: string[], value: any) => void;
  handleAddNewTag: () => void;
};

export function TagInput(props: Props) {
  const { value, onDataChanged, name, data, selectedType } = props;

  const handleChange = (path: string[], newValue: any) => {
    let newEntity;
    const lastPath = path[path.length - 1];
    if (lastPath === 'type') {
      const newPath = [...path];
      newPath.pop();
      const previousValue = _.get(value, newPath);
      if (previousValue.type != newValue) {
        if (newValue === 'mod') {
          delete previousValue.name;
          delete previousValue.type;
          newEntity = _.set([...value], newPath, {
            type: newValue,
            modType: 'attribute',
            modTarget: '',
            ...previousValue,
          });
        } else if (previousValue.type === 'mod') {
          delete previousValue.modType;
          delete previousValue.modTarget;
          delete previousValue.type;
          newEntity = _.set([...value], newPath, {
            type: newValue,
            name: '',
            ...previousValue,
          });
        } else {
          newEntity = _.set([...value], path, newValue);
        }
      }
    } else {
      newEntity = _.set([...value], path, newValue);
    }
    if (!path.length) {
      onDataChanged(name, newValue);
    } else {
      onDataChanged(name, newEntity);
    }
  };

  const handleAddNewTag = () => {
    const newTag = { type: 'skill', name: '', value: 0 };
    handleChange(['0', 'tags'], [...value[0]['tags'], newTag]);
  };

  const addTag = () => {
    if (name === 'actions') {
      handleChange([], [...value, { type: 'sendMessage', effect: '' }]);
      return;
    }
    handleChange([], [...value, { type: 'self', tags: [] }]);
  };

  return (
    <div>
      <IconButton
        onClick={() => addTag()}
        size="small"
        style={{ minWidth: 10 }}
      >
        <Plus fontSize="inherit" />
      </IconButton>
      {value.length && (
        <Paper
          key={'tagsCore'}
          elevation={3}
          style={{ padding: 5, margin: 10, marginRight: 40 }}
        >
          {printTags({
            tagName: name,
            tags: value,
            previousTag: [],
            selectedType,
            depth: 0,
            index: 0,
            path: [],
            data,
            tagType: '',
            handleChange,
            handleAddNewTag,
          })}
        </Paper>
      )}
    </div>
  );
}

const printTags = (params: printTagsParams) => {
  const { tags, path } = params;
  return (
    <div key={'tagOuter'}>
      {tags.some(t => typeof t === 'string') ||
      (tags.length === 0 && path.length > 2) ? (
        <div key={'multiSelect'}>{printValueMultiselect(params)}</div>
      ) : (
        tags.map((tag: { [index: string]: any }, index: number) => {
          return printTag({
            ...params,
            tags: [tag],
            previousTag: tags,
            path: [...path, index + ''],
          });
        })
      )}
    </div>
  );
};

const printTag = (params: printTagsParams) => {
  const {
    tags: [tag],
    path,
    depth,
    tagType,
  } = params;
  const newTagType = tag['type'] || tagType;
  const currentTagElement = getTagElements(path);
  const index = parseInt(path[path.length - 1]);
  const isOffset = ['event', 'tag', 'condition'].some(
    t => t === currentTagElement
  );

  return (
    <Paper
      key={`tagCore_${path.join('_')}`}
      className={'tagCore'}
      style={{
        ...(isOffset
          ? {
              padding: 7,
              marginTop: 0,
              marginLeft: 0,
              marginBottom: 10,
              marginRight: -7 * depth,
            }
          : {}),
      }}
      elevation={isOffset ? 4 : 0}
    >
      {Object.keys(tag).map((tagAttr, tagAttrIndex) => {
        const _isOffset = [...RESULTS_ENUM, ...CONDITIONS_ENUM].some(
          e => e === tagAttr
        );
        return (
          <>
            {currentTagElement === 'operand' &&
              parseInt(path[path.length - 1]) !== 0 && <Divider />}
            <div key={'attrCore'} className={'attrCore'}>
              {printTypeSelect(
                {
                  ...params,
                  tagType: tagAttr,
                },
                tagAttrIndex
              )}
              {Array.isArray(tag[tagAttr]) ? (
                <Paper
                  key={'tagInner'}
                  className={'tagInner'}
                  style={{
                    ...(_isOffset
                      ? {
                          padding: 7,
                          margin: 10,
                          marginTop: 0,
                          marginLeft: 0,
                          marginRight: -14 * depth,
                        }
                      : {}),
                  }}
                  elevation={_isOffset ? 4 : 0}
                >
                  {printTags({
                    ...params,
                    depth: depth + 1,
                    tags: tag[tagAttr],
                    path: [...path, tagAttr],
                    tagType: newTagType,
                  })}
                </Paper>
              ) : (
                printValueSelect({
                  ...params,
                  path: [...path, tagAttr],
                  tags: [tag],
                  tagType: tagAttr,
                })
              )}
            </div>
          </>
        );
      })}
      {printButtons(params, currentTagElement)}
    </Paper>
  );
};

const printTypeSelect = (params: printTagsParams, index: number) => {
  const { tagType: type, path, handleChange, tags } = params;
  const lastPath = path[path.length - 2] || 'tags';

  const selectChange = (type: string, value: any) => {
    const index = parseInt(path[path.length - 1]);
    const _tag = tags[index];
    const newValue = { [value]: [..._tag[type]] };
    handleChange(path, newValue);
  };

  const selectParams = {
    onDataChanged: (type: string, value: any) => selectChange(type, value),
    value: type,
    name: lastPath,
    type: type,
    list: [],
  };

  let optionalEl;
  let options: string[] = [];
  let _style = {};

  if (['tags', ...RESULTS_ENUM].some(e => e === lastPath) && index === 0) {
    return (
      <span>
        {type === 'onSuccess' || type === 'onFail'
          ? printButtons(params, type)
          : ''}
      </span>
    );
  } else if (CONDITIONS_ENUM.some(e => e === lastPath)) {
    optionalEl = addCondition(params);
    options = CONDITIONS_OPTIONS_ENUM;
    selectParams.name = 'Operand';
  } else if (CONDITIONS_OPTIONS_ENUM.some(e => e === lastPath)) {
    options = CONDITIONS_VALUES_ENUM;
    selectParams.name = 'Type';
    _style = { marginLeft: 20 };
    optionalEl = removeCondition(params);
  } else {
    const isLabelRequired = !GENERAL_OPTIONS_ENUM.some(t => t === type);
    return (
      <span>
        {isLabelRequired ? type : ''}
        {[...CONDITIONS_ENUM, ...RESULTS_ENUM].some(t => t === type)
          ? printButtons(params, type)
          : ''}
        {isLabelRequired ? ': ' : ''}
      </span>
    );
  }
  return (
    <div key={'selectInput'} style={_style}>
      {SelectInput({ ...selectParams, list: options })}
      {optionalEl}
    </div>
  );
};

const printValueSelect = (params: printTagsParams) => {
  const { tags, tagType: type, handleChange, path } = params;
  const [tag] = tags;
  if (type === 'value') {
    return (
      <NumberInput
        value={tag[type]}
        name={type}
        onDataChanged={(type, value) => handleChange(path, value)}
      ></NumberInput>
    ); // number
  } else if ([...GENERAL_OPTIONS_ENUM, 'type'].some(t => t === type)) {
    const lastPath = path[path.length - 3] || 'tags';
    if (RESULTS_ENUM.some(v => v === lastPath)) {
      return eventTypeSelect(params);
    }
    if (lastPath === 'tags' && path.length === 4 && type === 'type') {
      return tagTypeSelect(params);
    }
    const list = getOptionsForValueSelect(params);
    return SelectInput({
      onDataChanged: (type, value) => handleChange(path, value),
      value: tag[type],
      name: type,
      type: type,
      list,
    });
  }
  return TextInput({
    value: tag[type],
    name: type,
    onDataChanged: (type, value) => handleChange(path, value),
  });
};

const printValueMultiselect = (params: printTagsParams) => {
  const { tags, path, tagType, data, handleChange } = params;
  const values = tags as unknown as string[];
  const lastPath = path[path.length - 1];
  let parmams = { value: values, name: '', type: '', list: [''] };
  let _style = {};

  if (
    (STATUS_TYPES_EFFECTS_ENUM.some(s => s === tagType) &&
      lastPath === 'effect') ||
    CONDITIONS_STATUS_OPTIONS_ENUM.some(s => s === lastPath)
  ) {
    parmams.name = 'status';
    parmams.type = 'status';
    parmams.list = SELECT_ENUMS[parmams.type] as string[];
    _style = lastPath !== 'effect' ? { marginLeft: 30 } : {};
  } else if (
    NON_STATUS_TYPES_EFFECTS_ENUM.some(s => s === tagType) &&
    lastPath === 'effect'
  ) {
    if (tagType === 'triggerEvent') {
      parmams.name = 'event';
      parmams.type = 'event';
      parmams.list = Object.keys(data.actionEvent);
    } else {
      parmams.name = 'lore';
      parmams.type = 'lore';
      parmams.list = Object.keys(data.lore);
    }
  } else if (CONDITIONS_LORE_VALUES_ENUM.some(s => s === lastPath)) {
    parmams.name = 'lore';
    parmams.type = 'lore';
    parmams.list = Object.keys(data.lore);
    _style = { marginLeft: 30 };
  }
  return (
    <div style={_style}>
      {MultiSelectInput({
        onDataChanged: (name, value) => {
          handleChange(path, value);
          return;
        },
        ...parmams,
      })}
    </div>
  );
};

const getOptionsForValueSelect = (params: printTagsParams) => {
  const { tags, path, data, tagType: type, selectedType, previousTag } = params;
  const [tag] = tags;
  if (type === 'type') {
    if (selectedType === 'actionEvent') {
      return EFFECTS_TAG_TYPES_ENUM;
    }
    if (path.length === 2) {
      return GLOBAL_TAG_TYPES_ENUM;
    } else if (path[path.length - 3] === 'tags') {
      return GENERAL_TAG_TYPES_ENUM;
    }
    return EFFECTS_TAG_TYPES_ENUM;
  } else if (type === 'name') {
    const tagType = tag['type'];
    if (tagType === 'action') {
      return ACTIONS_ENUM;
    } else if (tagType === 'skill') {
      return Object.keys(data['skills']);
    }
  } else if (type === 'modType') {
    return MOD_TYPES_ENUM;
  } else if (type === 'modTarget') {
    if (tag['modType'] === 'attribute') {
      return ATTRS_ENUM;
    } else if (tag['modType'] === 'skill') {
      return Object.keys(data['skills']);
    }
  }
  return [];
};

const printButtons = (params: printTagsParams, currentTagElement: string) => {
  const {
    handleAddNewTag,
    handleChange,
    tags: [tag],
    tags,
    path,
    tagName,
  } = params;

  const addNewConditions = () => {
    handleChange(
      [...path, currentTagElement],
      [...tag[currentTagElement], { and: [{ status: [] }] }]
    );
  };
  const addNewEffect = () => {
    handleChange(
      [...path, currentTagElement],
      [...tag[currentTagElement], { type: '', effect: [] }]
    );
  };

  const removeConditions = () => {
    const _tag = { ...tag };
    delete _tag[currentTagElement];

    handleChange([...path], _tag);
  };

  const removeEffect = () => {
    const _tag = { ...tag };
    delete _tag[currentTagElement];

    handleChange([...path], _tag);
  };

  if (currentTagElement === 'tag' || currentTagElement === 'event') {
    return printTagButtons({
      ...params,
      tags: [tag],
    });
  }
  if (currentTagElement === 'core' && tagName !== 'actions') {
    return (
      <Button variant="outlined" size="small" onClick={() => handleAddNewTag()}>
        Add new tag
      </Button>
    );
  }
  if (
    currentTagElement === 'conditions' ||
    currentTagElement === 'outerConditions'
  ) {
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
  }
  if (currentTagElement === 'onSuccess' || currentTagElement === 'onFail') {
    return (
      <>
        <IconButton
          onClick={() => addNewEffect()}
          size="small"
          style={{ minWidth: 10 }}
        >
          <Plus fontSize="inherit" />
        </IconButton>
        <IconButton
          onClick={() => removeEffect()}
          size="small"
          style={{ minWidth: 10 }}
        >
          <Remove fontSize="inherit" />
        </IconButton>
      </>
    );
  }
};

const addCondition = (params: printTagsParams) => {
  const {
    handleChange,
    tags: [tag],
    tags,
    path,
    tagType,
  } = params;
  const addNewCondition = () => {
    handleChange([...path, tagType], [...tag[tagType], { status: [] }]);
  };
  return (
    <IconButton
      onClick={() => addNewCondition()}
      size="medium"
      style={{ minWidth: 10, marginTop: 15 }}
    >
      <Plus fontSize="inherit" />
    </IconButton>
  );
};

const removeCondition = (params: printTagsParams) => {
  const { handleChange, path, previousTag } = params;
  const removeCondition = () => {
    const _path = [...path];
    _path.splice(path.length - 1, 1);

    const tag = [...previousTag];
    tag.splice(parseInt(path[path.length - 1]), 1);

    handleChange(_path, tag);
  };

  return (
    <IconButton
      onClick={() => removeCondition()}
      size="medium"
      style={{ minWidth: 10, marginTop: 15 }}
    >
      <Remove fontSize="inherit" />
    </IconButton>
  );
};

const printTagButtons = (params: printTagsParams) => {
  const {
    tags: [tag],
    handleChange,
    path,
    depth,
  } = params;
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      {!tag.outerConditions && (
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            handleChange(path, {
              ...tag,
              outerConditions: [{ and: [{ status: [] }] }],
            });
          }}
        >
          Add outer Conditions
        </Button>
      )}
      {!tag.conditions && (
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            handleChange(path, {
              ...tag,
              conditions: [{ and: [{ status: [] }] }],
            });
          }}
        >
          Add Conditions
        </Button>
      )}
      {!tag.onSuccess && depth === 1 && (
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            handleChange(path, {
              ...tag,
              onSuccess: [{ type: '', effect: [] }],
            });
          }}
        >
          Add OnSuccess
        </Button>
      )}
      {!tag.onFail && depth === 1 && (
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            handleChange(path, { ...tag, onFail: [{ type: '', effect: [] }] });
          }}
        >
          Add OnFail
        </Button>
      )}
    </Stack>
  );
};

const eventTypeSelect = (params: printTagsParams) => {
  const { tags, tagType: type, handleChange, path, previousTag } = params;
  const [tag] = tags;
  const list = getOptionsForValueSelect(params);
  const removeEffect = () => {
    const _path = [...path];
    _path.splice(path.length - 2, 2);

    const tag = [...previousTag];
    tag.splice(parseInt(path[path.length - 2]), 1);
    handleChange(_path, tag);
  };

  return (
    <div>
      {SelectInput({
        onDataChanged: (type, value) => handleChange(path, value),
        value: tag[type],
        name: type,
        type: type,
        list,
      })}
      <IconButton
        onClick={() => removeEffect()}
        size="small"
        style={{ minWidth: 10 }}
      >
        <Remove fontSize="inherit" />
      </IconButton>
    </div>
  );
};

const tagTypeSelect = (params: printTagsParams) => {
  const { tags, tagType: type, handleChange, path, previousTag } = params;
  const [tag] = tags;
  const list = getOptionsForValueSelect(params);
  const removeEffect = () => {
    const _path = [...path];
    _path.splice(path.length - 2, 2);

    const tag = [...previousTag];
    tag.splice(parseInt(path[path.length - 2]), 1);
    handleChange(_path, tag);
  };

  return (
    <div>
      {SelectInput({
        onDataChanged: (type, value) => handleChange(path, value),
        value: tag[type],
        name: type,
        type: type,
        list,
      })}
      <IconButton
        onClick={() => removeEffect()}
        size="small"
        style={{ minWidth: 10 }}
      >
        <Remove fontSize="inherit" />
      </IconButton>
    </div>
  );
};

const getTagElements = (path: string[]): string => {
  const lastPath = path[path.length - 2] || '';
  if (lastPath === '') {
    return 'core';
  } else if (lastPath === 'tags') {
    return 'tag';
  } else if (lastPath === 'conditions' || lastPath === 'outerConditions') {
    return 'condition';
  } else if (lastPath === 'onSuccess' || lastPath === 'onFail') {
    return 'event';
  } else if (CONDITIONS_OPTIONS_ENUM.some(e => e === lastPath)) {
    return 'operand';
  }
  return 'notExists';
};

const tagStyle = {
  marginTop: 10,
  marginBottom: 10,
  padding: 10,
  borderRadius: 10,
  backgroundColor: 'rgba(0, 0, 0, 0.055)',
};
