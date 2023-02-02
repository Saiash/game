import { map } from 'lodash';
import React, { useState } from 'react';
import { rawEvent } from '../../models/events';
import { Tag } from '../../models/tag/models/tag';
import { callAPIEndpoint } from '../../utils';
import { AttrInput } from './attributeInputComponents';
import { TextInput } from './attributeInputComponents/text';
import { TypeSelector } from './components/TypeSelector';

const paramsForDataEntitites: { [index: string]: { [index: string]: string } } =
  {
    actionEvent: { description: 'text', actions: 'tags' },
    skills: {
      name: 'string',
      description: 'text',
      code: 'string',
      parentAttr: 'attr',
      difficulty: 'diff',
    },
    items: {
      name: 'string',
      description: 'text',
      text: 'string',
      image: 'string',
      weight: 'number',
      zones: 'string',
      cost: 'number',
      options: 'options',
      tags: 'tags',
    },
    objects: {
      name: 'string',
      description: 'text',
      status: 'status',
      tags: 'tags',
    },
    lore: { title: 'string', description: 'text' },
  };

const test = 1;

export function Editor() {
  const [data, setData] =
    useState<{ [index: string]: { [index: string]: any } }>();
  const [selectedType, setSelectedType] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [editedId, setEditedId] = useState('');
  const [selectedEntity, setSelectedEntity] = useState<{
    [index: string]: any;
  }>({});

  React.useMemo(async () => {
    const data = await callAPIEndpoint({
      endpoint: 'getEditorData',
      data: { test: '1' },
    });
    setData(data);
  }, []);

  if (!data) {
    return <></>;
  }

  const saveDate = async () => {
    const newData = { ...data };
    if (selectedId !== editedId) {
      delete newData[selectedType][selectedId];
    }
    newData[selectedType][editedId] = selectedEntity;
    setSelectedId(editedId);
    setData(newData);

    const savedData = await callAPIEndpoint({
      endpoint: 'saveEditorData',
      data: { type: selectedType, _data: newData[selectedType] },
    });
  };

  const onTypeSelect = (type: string) => {
    setSelectedType(type);
    setSelectedId('');
  };

  const onIdSelect = (id: string) => {
    setSelectedEntity(data[selectedType][id]);
    setSelectedId(id);
    setEditedId(id);
  };

  const handleIdChange = (name: string, value: any) => {
    setEditedId(value);
  };

  const addEntity = (type: string) => {
    const params = Object.keys(paramsForDataEntitites[type]);
    const newObj: any = {};

    params.forEach(p => {
      const pType = paramsForDataEntitites[type][p];
      let paramDefaultValue: any = '';
      if (pType === 'itemOptions') {
        paramDefaultValue = {};
      } else if (pType === 'boolean') {
        paramDefaultValue = false;
      } else if (['options', 'tag', 'status'].some(t => t === pType)) {
        paramDefaultValue = [];
      }
      newObj[p] = paramDefaultValue;
    });

    setSelectedType(type);
    setSelectedEntity(newObj);
    setSelectedId('new');
    setEditedId('new');
  };

  const onDataChanged = (type: string, value: any) => {
    setSelectedEntity({ ...selectedEntity, [type]: value });
  };

  const attrs = !selectedType
    ? []
    : Object.keys(paramsForDataEntitites[selectedType]);

  return (
    <div>
      <TypeSelector
        data={data}
        addEntity={addEntity}
        onTypeSelect={onTypeSelect}
        onIdSelect={onIdSelect}
        selectedType={selectedType}
        selectedId={selectedId}
      ></TypeSelector>
      {selectedId && (
        <div style={{ marginLeft: 222, paddingTop: 10 }}>
          <div>
            <div>
              <TextInput
                value={editedId}
                name={'Id'}
                onDataChanged={handleIdChange}
              ></TextInput>
            </div>
          </div>
          {attrs.map((attr, index) => {
            return (
              <AttrInput
                key={`${selectedId}_${attr}_${index}`}
                type={paramsForDataEntitites[selectedType][attr]}
                data={data}
                name={attr}
                selectedEntity={selectedEntity}
                selectedType={selectedType}
                onDataChanged={onDataChanged}
              ></AttrInput>
            );
          })}
          <div style={{ paddingTop: 10 }}>
            <button
              onClick={() => {
                saveDate();
              }}
            >
              Сохранить
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
