const Request = require('./Request');

void (async function () {
  const request = new Request({
    method: 'POST',
    host: '127.0.0.1',
    port: 8088,
    path: '/',
    headers: {
      ['X-Foo2']: 'customed',
    },
    body: {
      name: 'mxin',
      age: '18',
    },
  });

  console.log(request);

  const response = await request.send();

  console.log('Response', response);
})();
