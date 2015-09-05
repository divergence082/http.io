

/**
 * @param {string} hostname
 * @param {number} port
 * @param {h.Router} router
 * @param {Function} errorHandler
 * @return {h.in.Endpoint}
 */
h.in.createEndpoint = function(hostname, port, router, errorHandler) {
  var endpoint = new h.in.Endpoint(hostname, port);
  endpoint.setRouter(router);
  endpoint.setErrorHandler(errorHandler);
  return endpoint;
};
