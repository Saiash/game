export async function callAPIEndpoint({
  endpoint,
  data,
}: {
  endpoint: string;
  data: any;
}): Promise<any> {
  return fetch('http://localhost:5001/', {
    body: JSON.stringify({ endpoint, data }),
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  }).then(async function (response) {
    return response.json();
  });
}
