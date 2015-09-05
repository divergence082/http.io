

var h = require('../bin/index.js');


/**
 * @param {!h.Response} response
 */
function complete(response) {
  console.log('RESPONSE');
  console.log('status code:', response.getStatusCode());
  console.log('payload:', response.getPayload());
  console.log('headers:', response.getHeaders());
  console.log('--------');
}


h.out.send(complete, console.error, h.out.createRequest(
    h.in.Endpoint.DEFAULT_HOSTNAME, 8089, '/path?q=1&w=2'));
