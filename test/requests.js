

var http = require('http');
var h = require('../bin/index.js');

var server = http.createServer();
server.addListener('request', h.io.handleRequest(router));
server.listen(8080, '0.0.0.0');

function router(complete, cancel, request) {
  console.log('LOG: router: request', request);
  complete(h.io.createResponse(h.Status.OK, '{"a": 3}', {}));
}