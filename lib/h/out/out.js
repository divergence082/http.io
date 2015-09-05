

/**
 * @param {!h.ResponseHandler} complete
 * @param {!function(!Error)} cancel
 * @param {!h.out.Request} request
 */
h.out.send = function(complete, cancel, request) {
  var attemptCount = 1;
  var timeout = null;

  /**
   *
   */
  function clearAttemptsTimeout() {
    if (timeout) {
      clearTimeout(timeout);
    }
  }

  /**
   * @param {!Error} error
   */
  function handleError(error) {
    if (attemptCount < h.out.__ATTEMPTS_LIMIT) {
      timeout = setTimeout(send, h.out.__ATTEMPTS_TIMEOUT);
    } else {
      cancel(error);
    }
  }

  /**
   * @param {!http.IncomingMessage} response
   */
  function handleResponse(response) {
    var data = '';

    /**
     * @param {!Buffer} chunk
     */
    function handleData(chunk) {
      data += chunk;
    }

    /**
     *
     */
    function handleResult() {
      complete(h.createResponse(
          String(data),
          response.headers || {},
          response.statusCode
          ));
    }

    response.on('data', handleData);
    response.on('end', handleResult);
  }

  /**
   *
   */
  function send() {
    clearAttemptsTimeout();
    var req = http.request(request.getOptions(), handleResponse);
    req.on('error', handleError);
    req.end(request.getPayload());
    attemptCount += 1;
  }

  send();
};


/**
 * @param {number} limit
 */
h.out.setAttemptsLimit = function(limit) {
  h.out.__ATTEMPTS_LIMIT = limit > 1 ? limit : h.out.__ATTEMPTS_LIMIT;
};


/**
 * @param {number} timeout
 */
h.out.setAttemptsTimeout = function(timeout) {
  h.out.__ATTEMPTS_TIMEOUT = timeout ?
      Math.ceil(timeout) : h.out.__ATTEMPTS_TIMEOUT;
};


/**
 * @param {string} host
 * @param {number} port
 * @param {string} path
 * @param {string=} opt_payload
 * @param {!Object=} opt_headers
 * @param {Method=} opt_method
 * @return {h.Request}
 */
h.out.createRequest = function(
    host, port, path, opt_payload, opt_headers, opt_method) {
  var questionIndex = path.indexOf('?');
  var queryIndex = questionIndex === -1 ? path.length : questionIndex;

  return new h.out.Request(
      new h.Endpoint(host, port),
      opt_method || Method.GET,
      path.slice(0, queryIndex),
      path.slice(queryIndex),
      opt_payload || '',
      opt_headers || {});
};


/**
 * @type {number}
 */
h.out.__ATTEMPTS_TIMEOUT = 2000;


/**
 * @type {number}
 */
h.out.__ATTEMPTS_LIMIT = 6;
