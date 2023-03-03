import { NodeComponentSize, NodeProps } from './nodeComponent';

type params = {
  nextNode: NodeProps['node'];
  currentNode: NodeProps['node'];
};

const arrowOffset = 15;

export function NodeArrow(params: params) {
  const { nextNode, currentNode } = params;
  if (!nextNode || !currentNode) return <></>;

  const yOffset = currentNode.y > nextNode.y ? 3 : -3;
  const xOffset = currentNode.x > nextNode.x ? 9 : -9;

  const startingCoords = {
    x: currentNode.x + NodeComponentSize.width,
    y: currentNode.y + NodeComponentSize.height / 2,
  };

  const endingCoords = {
    x: nextNode.x,
    y: nextNode.y + NodeComponentSize.height / 2 + yOffset,
  };

  const isEndingLower = endingCoords.y > startingCoords.y;

  if (startingCoords.x > endingCoords.x) {
    return (
      <path
        d={`M ${startingCoords.x} ${startingCoords.y} h ${arrowOffset} v ${
          isEndingLower ? '' : '-'
        }${NodeComponentSize.height / 2 + arrowOffset} H ${
          endingCoords.x - arrowOffset
        } V ${endingCoords.y} h 5`}
        fill="transparent"
        stroke="black"
        markerEnd="url(#arrowhead)"
      />
    );
  }
  return (
    <line
      x1={`${startingCoords.x} `}
      y1={`${startingCoords.y}`}
      x2={`${endingCoords.x + xOffset}`}
      y2={`${endingCoords.y}`}
      stroke="black"
      markerEnd="url(#arrowhead)"
    />
  );
}
