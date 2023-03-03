import { NodeArrow } from './nodeArrow';
import { NodeProps } from './nodeComponent';

export type params = {
  nodes: NodeProps['node'][];
  data: any;
};

export function ArrowsContainer(params: params) {
  const { nodes, data } = params;
  return (
    <svg style={{ width: '100%', height: '100%' }}>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="0"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" />
        </marker>
      </defs>
      {nodes.map(node => {
        if (!node.arrows) return <></>;
        return node.arrows.map(
          (arrow: { nextNodeId: string }, arrowIndex: number) => {
            const { nextNodeId } = arrow;
            return (
              <NodeArrow
                key={`${node.id}_${arrowIndex}`}
                nextNode={data['nodes'][nextNodeId]}
                currentNode={node}
              />
            );
          }
        );
      })}
    </svg>
  );
}
