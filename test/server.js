

var h = require('../bin/index.js');
var status = require('iana-http-status-codes');


/**
 * @param {!h.ResponseHandler} complete
 * @param {!h.ResponseHandler} cancel
 * @param {!h.Request} request
 */
function router(complete, cancel, request) {
  console.log('REQUEST');
  console.log('method:', request.getMethod());
  console.log('path:', request.getPath());
  console.log('pathname:', request.getPathname());
  console.log('query:', request.getQueryString());
  console.log('payload:', request.getPayload());
  console.log('headers:', request.getHeaders());
  console.log('-------');

  complete(h.in.createResponse('OK', {}, status.Code.OK));
}


var endpoint = h.in.createEndpoint(
    h.in.Endpoint.DEFAULT_HOSTNAME, 8089, router, console.error);


endpoint.listen();
