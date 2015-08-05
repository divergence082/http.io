

/**
 * @typedef {!function(
 *    !function(string), !function(string, number=), !h.Request)}
 */
h.RequestHandler;


/**
 * @param {!h.RequestHandler} handler
 * @param {number} port
 * @param {string=} opt_host
 */
h.in.listen = function(handler, port, opt_host) {
  var server = http.createServer();
  server.addListener('request', h.in.__handleRequest(handler));
  server.addListener('error', h.in.__handleError);
  server.listen(port, opt_host);
};


/**
 * @param {!h.RequestHandler} handler
 * @return {!function(!http.IncomingMessage, !http.ServerResponse)}
 */
h.in.__handleRequest = function(handler) {

  /**
   * @param {!http.IncomingMessage} request
   * @param {!http.ServerResponse} response
   */
  function handleRequest(request, response) {
    var payload = '';

    /**
     * @param {string} result
     */
    function complete(result) {
      response.statusCode(h.Status.OK);
      response.end(result);
    }

    /**
     * @param {string} error
     * @param {number=} opt_code
     */
    function cancel(error, opt_code) {
      response.statusCode(opt_code || h.Status.INTERNAL_SERVER_ERROR);
      response.end(error);
    }

    /**
     * @param {!Buffer} data
     */
    function handleData(data) {
      payload += data;
    }

    /**
     *
     */
    function handleClose() {
      handler(complete, cancel, h.createRequest(request, payload));
    }

    request.addListener('data', handleData);
    request.addListener('close', handleClose);
    request.addListener('end', handleClose);
  }

  return handleRequest;
};


/**
 * @param {!Error} error
 */
h.in.__handleError = function(error) {
  console.error('ERROR: [h.in.__handleError] ' + JSON.stringify(error));
};
