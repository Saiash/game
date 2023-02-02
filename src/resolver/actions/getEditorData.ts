import fs from 'fs/promises';
import fs2 from 'fs';

export default async function getEditorData() {
  const folder = './src/data/';
  const data: any = {};
  const types = await fs.readdir(folder);
  for (const type of types) {
    const filename = folder + '/' + type + '/index.json';
    const exists = fs2.existsSync(filename);

    if (exists) {
      const fileData = await fs.readFile(filename, 'utf8');
      data[type] = JSON.parse(fileData);
    }
  }
  return data;
}
