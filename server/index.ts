import express from 'express';
import resolveRequest from './src/resolver';

const app = express();
app.use(express.json());
const port = 3001

app.post('/', (request, response) => {
  const body = request.body;
  const data = resolveRequest(body);
  response.send(data);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})