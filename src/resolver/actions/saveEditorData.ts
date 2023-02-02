import fs from 'fs/promises';

export default async function saveEditorData(input: any) {
  const { data } = input;
  const { type, _data } = data;
  if (!type) return;

  const folder = './src/data/';
  await fs.writeFile(folder + type + `/index.json`, JSON.stringify(_data));

  return true;
}
