import { MutableRefObject, useRef, useState } from 'react';
import { NodeComponent, NodeProps } from './nodeComponent';
import { ArrowsContainer } from './arrowsContainer';
import Button from '@mui/material/Button';
import { NodeEditor } from './nodeEditor';

type Props = {
  name: string;
  type: string;
  selectedEntity: { [index: string]: any };
  selectedType: string;
  value: string[];
  data: { [index: string]: { [index: string]: any } };
  onDataChanged: (type: string, value: any) => void;
  onNodesChanged: (nodes: any) => void;
};

export function NodesEditorContainer(params: Props) {
  const { name, value, data, onNodesChanged, onDataChanged } = params;
  const [selectedNodeId, setSelectedNodeId] = useState('');

  const nodes = value.map(nodeId => {
    return { ...data.nodes[nodeId] };
  }) as NodeProps['node'][];

  const nodeContainerObj =
    useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement | null>;

  const handleAddNode = () => {
    onNodesChanged({
      ...data['nodes'],
      newNode: {
        x: 0,
        y: 0,
        name: 'newNode',
        description: 'newNode',
        type: 'node',
        content: [],
        actions: [],
        arrows: [],
      },
    });
    onDataChanged(name, [...value, 'newNode']);
  };

  const handleChangeNodeId = (oldId: string, newId: string) => {
    const nodes = [...value].filter(nodeId => nodeId !== oldId);
    onDataChanged(name, [...nodes, newId]);
  };

  return (
    <>
      <div
        ref={nodeContainerObj}
        style={{
          position: 'relative',
          height: 600,
          marginRight: 10,
          border: '1px solid black',
        }}
      >
        <Button
          variant="outlined"
          size="small"
          onClick={handleAddNode}
          style={{ position: 'absolute' }}
        >
          Add
        </Button>
        {value.map((nodeId, nodeIndex) => {
          return (
            <NodeComponent
              node={data['nodes'][nodeId]}
              key={`node_${nodeIndex}`}
              nodeContainerObj={nodeContainerObj}
              nodeId={nodeId}
              onNodesChanged={node => {
                onNodesChanged({ ...data['nodes'], ...node });
              }}
              setSelectedNodeId={setSelectedNodeId}
            />
          );
        })}
        <ArrowsContainer key={`arrows`} nodes={nodes} data={data} />
      </div>
      {!!selectedNodeId && (
        <NodeEditor
          data={data}
          node={data['nodes'][selectedNodeId]}
          sceneNodes={value}
          nodeId={selectedNodeId}
          onNodesChanged={onNodesChanged}
          handleChangeNodeId={handleChangeNodeId}
          setSelectedNodeId={setSelectedNodeId}
        />
      )}
    </>
  );
}
