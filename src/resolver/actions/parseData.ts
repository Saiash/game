import fs from 'fs/promises';

export default async function collectData() {
  const folder = './src/data/';
  const data: any = {};
  const types = ['actions', 'info', 'nodes', 'events', 'scenes'];
  for (const type of types) {
    const files = await fs.readdir(folder + type + '/_current/');
    const sceneData: any = [];
    for (const file of files) {
      const fileData = await fs.readFile(
        folder + type + '/_current/' + file,
        'utf8'
      );
      sceneData.push(fileData);
    }
    data[type] = JSON.parse(sceneData);
  }
  return data;
}
