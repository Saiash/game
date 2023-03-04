import { NodeData } from '../../../../core/engine/SceneEngine/nodes/node';
import { NODE_TYPE } from '../constants';
import { SelectInput } from '../select';
import { TextInput } from '../text';
import { TextAreaInput } from '../textArea';
import { NodeActionsEditor } from './nodeActionsEditor';
import { NodeArrowsEditor } from './nodeArrowsEditor';
import { NodeContentEditor } from './nodeContentEditor';

const fields: { [index: string]: string } = {
  id: 'string', //?
  name: 'string',
  description: 'text',
  type: 'nodeType',
  content: 'nodeContent',
  actions: 'nodeActions',
  arrows: 'nodeArrows',
};

const fieldsToEditors: { [index: string]: (props: any) => JSX.Element } = {
  string: TextInput,
  text: TextAreaInput,
  nodeType: SelectInput,
  nodeContent: NodeContentEditor,
  nodeActions: NodeActionsEditor,
  nodeArrows: NodeArrowsEditor,
};

export type params = {
  sceneNodes: string[];
  data: any;
  nodeId: string;
  node: NodeData & {
    x: number;
    y: number;
    name: string;
    description: string;
  };
  onNodesChanged: (nodes: any) => void;
  handleChangeNodeId: (oldId: string, newId: string) => void;
  setSelectedNodeId: (newId: string) => void;
};

export function NodeEditor(params: params) {
  const {
    data,
    node,
    nodeId,
    onNodesChanged,
    handleChangeNodeId,
    setSelectedNodeId,
    sceneNodes,
  } = params;

  const handleChange = (param: string, value: any) => {
    onNodesChanged({
      ...data['nodes'],
      [nodeId]: { ...node, [param]: value },
    });
  };
  const handleChangeId = (param: string, value: any) => {
    const nodes = { ...data['nodes'] };
    delete nodes[nodeId];
    handleChangeNodeId(nodeId, value);
    onNodesChanged({ ...nodes, [value]: { ...node } });
    setSelectedNodeId(value);
  };

  return (
    <div>
      {Object.keys(fields).map(fieldName => {
        // @ts-ignore
        const value = node[fieldName];
        if (fieldName === 'id') {
          return (
            <div key={`${node.id}_${fieldName}`}>
              <TextInput
                value={nodeId}
                name={fieldName}
                onDataChanged={(fieldName, value) =>
                  handleChangeId(fieldName, value)
                }
              />
            </div>
          );
        } else {
          return (
            <div key={`${node.id}_${fieldName}`}>
              {fieldsToEditors[fields[fieldName]]({
                key: `${node.id}_${fieldName}_1`,
                sceneNodes,
                data,
                value,
                name: fieldName,
                list: NODE_TYPE,
                onDataChanged: (fieldName: any, value: any) =>
                  handleChange(fieldName, value),
              })}
            </div>
          );
        }
      })}
    </div>
  );
}
