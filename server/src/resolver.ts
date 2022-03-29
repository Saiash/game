import actions from './actions';

export default function resolveRequest(body) {
  const { action, ...data } = body;
  if (actions[action]) return actions[action](data);
  throw new Error('no action found!');
}
