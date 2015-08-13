

/**
 * @param {!h.Router} router
 * @return {!function(!http.IncomingMessage, !http.ServerResponse)}
 */
h.io.handleRequest = function(router) {

  /**
   * @param {!http.IncomingMessage} request
   * @param {!http.ServerResponse} response
   */
  function handleRequest(request, response) {
    var data = '';

    /**
     * @param {!h.io.Response} result
     */
    function complete(result) {
      response.statusCode = Number(result.getStatus() || h.Status.OK);
      response.end(result.getPayload());
    }

    /**
     * @param {!h.io.Response} result
     */
    function cancel(result) {
      response.statusCode =
          Number(result.getStatus() || h.Status.INTERNAL_SERVER_ERROR);
      response.end(result.getPayload());
    }

    /**
     * @param {!buffer.Buffer} chunk
     */
    function handleData(chunk) {
      data += String(chunk);
    }

    /**
     *
     */
    function handleClose() {
      var decodedUrl = codec.url.decode(String(request.url || '/'));
      var method = String(request.method || h.Method.GET);
      var path = String(decodedUrl['pathname'] || '/');
      var payload = method === h.Method.GET ||
          method === h.Method.DELETE ?
          String(decodedUrl['search'] || '').slice(1) : data;
      var headers = request.headers || {};

      router(complete, cancel,
          h.io.createRequest(method, path, payload, headers));
    }

    request.addListener('data', handleData);
    request.addListener('close', handleClose);
    request.addListener('end', handleClose);
  }

  return handleRequest;
};


///**
// * @param {!function(!h.io.Message)} complete
// * @param {!function(string, number=)} cancel
// * @param {!h.io.Message} message
// */
//h.io.sendRequest = function(complete, cancel, message) {
//  var attemptCount = 1;
//  var timeout = null;
//
//
//  /**
//   *
//   */
//  function clearSendTimeout() {
//    if (timeout) {
//      clearInterval(timeout);
//    }
//  }
//
//
//  /**
//   * @param {!Error} error
//   */
//  function handleError(error) {
//    if (attemptCount < h.io.__ATTEMPTS_LIMIT) {
//      timeout = setTimeout(send, h.io.__ATTEMPTS_TIMEOUT);
//    } else {
//      cancel('[h.io.sendRequest] ' + error);
//    }
//  }
//
//
//  /**
//   * @param {!http.IncomingMessage} response
//   */
//  function handleResponse(response) {
//    var data = '';
//
//    /**
//     * @param {!buffer.Buffer} chunk
//     */
//    function handleData(chunk) {
//      data += chunk;
//    }
//
//    /**
//     *
//     */
//    function handleResult() {
//      var decodedUrl = codec.url.decode(String(message.url || '/'));
//      var method = String(message.method || h.Method.GET);
//      var path = String(decodedUrl['pathname'] || '/');
//      var payload = method === h.Method.GET ||
//                    method === h.Method.DELETE ?
//          String(decodedUrl['search'] || '').slice(1) : data;
//      var headers = message.headers || {};
//
//      complete(h.io.createRequest(method, path, payload, headers));
//    }
//
//    response.on('data', handleData);
//    response.on('end', handleResult);
//  }
//
//  /**
//   *
//   */
//  function send() {
//    clearSendTimeout();
//    var options = message.serialize();
//    var payload = h.codec.encodePayload(
//        message.getPayload(), message.getContentType());
//
//    console.info('INFO: [h.io.sendRequest] ' + new Date() + ' : ' +
//        'REQUEST: ' + JSON.stringify(options) + ' : ' +
//        'Attempt (' + attemptCount + ').');
//
//    var request = http.request(options, handleResponse);
//    request.on('error', handleError);
//    request.end(payload ? payload : undefined);
//
//    attemptCount += 1;
//  }
//
//  send();
//};


/**
 * @param {number} limit
 */
h.io.setAttemptsLimit = function(limit) {
  h.io.__ATTEMPTS_LIMIT = limit > 1 ? limit : h.io.__ATTEMPTS_LIMIT;
};


/**
 * @param {number} timeout
 */
h.io.setAttemptsTimeout = function(timeout) {
  h.io.__ATTEMPTS_TIMEOUT = timeout ?
      Math.ceil(timeout) : h.io.__ATTEMPTS_TIMEOUT;
};


/**
 * @param {string} method
 * @param {string} path
 * @param {string} payload
 * @param {!Object} headers
 * @return {!h.io.Request}
 */
h.io.createRequest = function(method, path, payload, headers) {
  return new h.io.Request(method, path, payload, headers);
};


/**
 * @param {number} status
 * @param {string} payload
 * @param {!Object} headers
 * @return {!h.io.Response}
 */
h.io.createResponse = function(status, payload, headers) {
  return new h.io.Response(status, payload, headers);
};


/**
 * @type {number}
 */
h.io.__ATTEMPTS_LIMIT = 6;


/**
 * @type {number}
 */
h.io.__ATTEMPTS_TIMEOUT = 1000;
