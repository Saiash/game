import { useState, useEffect, MutableRefObject } from 'react';
import { Divider, IconButton, Paper } from '@mui/material';
import { NodeData } from '../../../../models/nodes/node';
import { Settings } from '@mui/icons-material';

export type NodeProps = {
  node: NodeData & {
    x: number;
    y: number;
    name: string;
    description: string;
  };
  nodeId: string;
  nodeContainerObj: MutableRefObject<HTMLDivElement | null>;
  onNodesChanged: (nodes: any) => void;
  setSelectedNodeId: (nodeId: string) => void;
};

export const NodeComponentSize = {
  width: 200,
  height: 80,
};

export function NodeComponent(params: NodeProps) {
  const { nodeContainerObj, node, onNodesChanged, setSelectedNodeId, nodeId } =
    params;
  const [coords, setCoords] = useState({ x: node.x, y: node.y });
  const [isDragged, setIsDragged] = useState(false);
  const [parentBlockCoords, setParentBlockCoords] = useState({
    x: nodeContainerObj.current?.offsetLeft || 0,
    y: nodeContainerObj.current?.offsetTop || 0,
  });

  const handleDrag = (event: any) => {
    setCoords({
      x: event.pageX - NodeComponentSize.width / 2 - parentBlockCoords.x,
      y: event.pageY - NodeComponentSize.height / 2 - parentBlockCoords.y,
    });
  };
  let dragImg: any;

  useEffect(() => {
    dragImg = new Image(0, 0);
    dragImg.src =
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  });

  useEffect(() => {
    setParentBlockCoords({
      x: nodeContainerObj.current?.offsetLeft || 0,
      y: nodeContainerObj.current?.offsetTop || 0,
    });
  }, [nodeContainerObj]);

  const handleOnDragStart = (e: any) => {
    e.dataTransfer.setDragImage(dragImg, 0, 0);
    setIsDragged(true);
  };

  const handleOnDragEnd = (e: any) => {
    onNodesChanged({ [nodeId]: { ...node, x: coords.x, y: coords.y } });
    setIsDragged(false);
  };

  const editNode = () => {
    setSelectedNodeId(nodeId);
  };

  return (
    <Paper
      draggable={true}
      onDragOver={handleDrag}
      onDragStart={handleOnDragStart}
      onDragEnd={handleOnDragEnd}
      className={'tagCore'}
      elevation={4}
      style={{
        zIndex: isDragged ? 10 : 1,
        position: 'absolute',
        width: NodeComponentSize.width,
        height: NodeComponentSize.height,
        top: coords.y,
        left: coords.x,
        boxSizing: 'border-box',
        fontSize: 14,
      }}
    >
      <div
        style={{
          paddingTop: 2,
          paddingBottom: 2,
          textAlign: 'center',
          backgroundColor: '#EFEFEF',
        }}
      >
        {node.name}
        <IconButton
          onClick={editNode}
          size="small"
          style={{ fontSize: 14, padding: 0, marginLeft: 4, marginTop: -2 }}
        >
          <Settings fontSize="inherit" />
        </IconButton>
      </div>
      <Divider />
      <div style={{ paddingLeft: 6, paddingTop: 4 }}>{node.description}</div>
    </Paper>
  );
}
