import { NODE_TYPES } from './Node/constants';
import type { CTX } from '../types';

export function getNodeFragmentsPayload({
  ctx,
  textFragments,
  isAdmin,
}: {
  ctx: CTX;
  textFragments: string[];
  isAdmin: boolean;
}): JSX.Element[] {
  const textJSX: JSX.Element[] = [];
  let keyI = 0;

  for (const fragment of textFragments) {
    if (fragment[0] === '{') {
      const fragmentId = fragment.substr(1, fragment.length - 2);
      const fragmentType = fragmentId.split('_')[0];
      const Component = NODE_TYPES[fragmentType];
      textJSX.push(
        <Component key={keyI++} id={fragmentId} ctx={ctx} isAdmin={isAdmin}>
          {fragment}
        </Component>
      );
    } else {
      textJSX.push(<span key={keyI++}>{fragment}</span>);
    }
  }

  return textJSX;
}

export function getTextFragments({ text }: { text: string }): string[] {
  return text.split(/({(?:actions|nodes|info)_\d*})+/).filter(Boolean);
}
