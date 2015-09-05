

/**
 * @param {string} hostname
 * @param {number} port
 * @param {h.Router} router
 * @param {!function(...?)} errorHandler
 * @return {h.in.Endpoint}
 */
h.in.createEndpoint = function(hostname, port, router, errorHandler) {
  var endpoint = new h.in.Endpoint(hostname, port);
  endpoint.setRouter(router);
  endpoint.setErrorHandler(errorHandler);
  return endpoint;
};


/**
 * @param {string} payload
 * @param {!Object} headers
 * @param {string=} opt_path
 * @param {string=} opt_method
 * @return {!h.Request}
 */
h.in.createRequest = function(payload, headers, opt_path, opt_method) {
  return new h.Request(
      String(opt_method || Method.GET), opt_path || '/', payload, headers);
};


/**
 * @param {string} payload
 * @param {!Object} headers
 * @param {number=} opt_status
 * @return {!h.Response}
 */
h.in.createResponse = h.createResponse;
