import actions from './actions';

export default async function resolveRequest(body: any) {
  const { endpoint, ...input } = body;
  const actionsList: { [index: string]: any } = actions;
  if (actionsList[endpoint]) return actionsList[endpoint](input);
  throw new Error('no endpoint found!');
}
