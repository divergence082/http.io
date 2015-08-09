

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
    var payload = '';

    /**
     * @param {string} result
     */
    function complete(result) {
      response.statusCode = h.io.Status.OK;
      response.end(result);
    }

    /**
     * @param {string} error
     * @param {number=} opt_code
     */
    function cancel(error, opt_code) {
      response.statusCode = opt_code || h.io.Status.INTERNAL_SERVER_ERROR;
      response.end(error);
    }

    /**
     * @param {!buffer.Buffer} data
     */
    function handleData(data) {
      payload += data;
    }

    /**
     *
     */
    function handleClose() {
      router(complete, cancel, h.io.__createMessage(request, payload));
    }

    request.addListener('data', handleData);
    request.addListener('close', handleClose);
    request.addListener('end', handleClose);
  }

  return handleRequest;
};


/**
 * @param {!function(!h.io.Message)} complete
 * @param {!function(string, number=)} cancel
 * @param {!h.io.Message} message
 */
h.io.sendRequest = function(complete, cancel, message) {
  var attemptCount = 1;
  var timeout = null;


  /**
   *
   */
  function clearSendTimeout() {
    if (timeout) {
      clearInterval(timeout);
    }
  }


  /**
   * @param {!Error} error
   */
  function handleError(error) {
    if (attemptCount < h.io.__ATTEMPTS_LIMIT) {
      timeout = setTimeout(send, h.io.__ATTEMPTS_TIMEOUT);
    } else {
      cancel('[h.io.sendRequest] ' + error);
    }
  }


  /**
   * @param {!http.IncomingMessage} response
   */
  function handleResponse(response) {
    var data = '';

    /**
     * @param {!buffer.Buffer} chunk
     */
    function handleData(chunk) {
      data += chunk;
    }

    /**
     *
     */
    function handleResult() {
      complete(h.io.__createMessage(response, data));
    }

    response.on('data', handleData);
    response.on('end', handleResult);
  }

  /**
   *
   */
  function send() {
    clearSendTimeout();
    var options = message.serialize();
    var payload = h.codec.encodePayload(
        message.getPayload(), message.getContentType());

    console.info('INFO: [h.io.sendRequest] ' + new Date() + ' : ' +
        'REQUEST: ' + JSON.stringify(options) + ' : ' +
        'Attempt (' + attemptCount + ').');

    var request = http.request(options, handleResponse);
    request.on('error', handleError);
    request.end(payload ? payload : undefined);

    attemptCount += 1;
  }

  send();
};


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
 * @type {number}
 */
h.io.__ATTEMPTS_LIMIT = 6;


/**
 * @type {number}
 */
h.io.__ATTEMPTS_TIMEOUT = 1000;


/**
 * @param {!http.IncomingMessage} incomingMessage
 * @param {string} payload
 * @return {!h.io.Message}
 */
h.io.__createMessage = function(incomingMessage, payload) {
  var messageUrl = String(incomingMessage.url || '');
  var decodedUrl = h.codec.decodeUrl(messageUrl);
  var message = new h.io.Message(
      String(incomingMessage.method || h.io.Method.GET),
      String(decodedUrl['pathname'] || '/'),
      incomingMessage.headers || {});
  message.setPayload(
      h.codec.decodePayload(payload, message.getContentType(), messageUrl));
  return message;
};
