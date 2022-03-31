import fs from 'fs/promises';

export default async function saveData(input: any) {
  const { data } = input;
  const { type, id } = data;
  //const folder = './pages/data/nodes/_current/scene_01/';
  if (!type) return;
  const folder = './src/data/';
  const fileDataRaw: any = await fs.readFile(
    folder + type + '/_current/index.json'
  );
  const fileData = JSON.parse(fileDataRaw);
  if (!fileData[id]) return;
  await fs.writeFile(
    folder + type + `/_backup_data/index-${Date.now()}.json`,
    fileDataRaw
  );
  fileData[id] = { ...fileData[id], ...data };
  await fs.writeFile(
    folder + type + `/_current/index.json`,
    JSON.stringify(fileData)
  );

  return { type, data: fileData };
}
