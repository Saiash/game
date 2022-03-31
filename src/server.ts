import express from 'express';
import resolveRequest from './resolver';

const app = express(); //Line 2
app.use(
  express.json({
    type: ['application/json', 'text/plain'],
  })
);
const port = process.env.PORT || 5001; //Line 3

app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.send();
});

app.post('/', async (request, response) => {
  const body = request.body;
  const data = await resolveRequest(body);
  response.set('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  response.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port2 ${port}`);
});
