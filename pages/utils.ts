export async function callAPIEndpoint({
  endpoint,
  data,
}: {
  endpoint: string;
  data: any;
}): Promise<any> {
  return fetch('/api/endpoint', {
    body: JSON.stringify({ endpoint, data }),
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  }).then(function (response) {
    return response.json();
  });
}
