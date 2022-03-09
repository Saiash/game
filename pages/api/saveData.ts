// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fs = require('fs/promises');

import type { NextApiRequest, NextApiResponse } from 'next';

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(await saveData(req));
}

export const saveData = async (req: NextApiRequest) => {
  console.log('test');
  const { id, type, ...data } = req.body;
  //const folder = './pages/data/nodes/_current/scene_01/';
  if (!type) return;
  const folder = './pages/data/';
  const fileDataRaw = await fs.readFile(folder + type + '/_current/index.json');
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
};
