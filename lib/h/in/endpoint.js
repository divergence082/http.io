


/**
 * @param {string} hostname
 * @param {number} port
 * @constructor
 */
h.in.Endpoint = function(hostname, port) {

  /**
   * @type {string}
   */
  this.__hostname = hostname;

  /**
   * @type {number}
   */
  this.__port = port;

  /**
   * @type {!h.Router}
   */
  this.__router = h.in.Endpoint.__defaultRouter;

  /**
   * @type {Function}
   */
  this.__handleError = console.error;

};


/**
 * @param {!h.ResponseHandler} complete
 * @param {!h.ResponseHandler} cancel
 * @param {!h.Request} request
 */
h.in.Endpoint.__defaultRouter = function(complete, cancel, request) {
  cancel(h.createResponse('', {}, status.Code.NOT_IMPLEMENTED));
};


/**
 * @param {!h.Router} router
 */
h.in.Endpoint.prototype.listen = function(router) {
  this.__router = router;
  var server = new http.Server();
  server.addListener('request', this.__handleRequest);
  server.addListener('end', this.__handleError);
  server.listen(this.__port, this.__hostname);
};


/**
 * @param {!h.Router} router
 */
h.in.Endpoint.prototype.setRouter = function(router) {
  this.__router = router;
};


/**
 * @param {Function} handler
 */
h.in.Endpoint.prototype.setErrorHandler = function(handler) {
  this.__handleError = handler;
};


/**
 * @param {!http.IncomingMessage} request
 * @param {!http.ServerResponse} response
 */
h.in.Endpoint.prototype.__handleRequest = function(request, response) {
  var self = this;
  var payload = '';

  /**
   * @param {status.Code} defaultCode
   * @return {!function(!h.Response)}
   */
  function handleResult(defaultCode) {

    /**
     * @param {!h.Response} result
     */
    function handle(result) {
      var statusCode = Number(result.getStatus() || defaultCode);
      response.writeHead(
          statusCode, status.Message[statusCode], result.getHeaders());
      response.end(result.getPayload());
    }

    return handle();
  }


  /**
   * @param {!Buffer} chunk
   */
  function handleData(chunk) {
    payload += String(chunk);
  }

  /**
   *
   */
  function handleClose() {
    self.__router(
        handleResult(status.Code.OK),
        handleResult(status.Code.INTERNAL_SERVER_ERROR),
        h.createRequest(
            payload,
            request.headers || {},
            request.method,
            request.url
        ));
  }

  request.addListener('data', handleData);
  request.addListener('close', handleClose);
  request.addListener('end', handleClose);
};
