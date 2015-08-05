

/**
 * @namespace
 */
var h = {};


/**
 * @namespace
 */
h.in = {};


/**
 * @namespace
 */
h.out = {};


/**
 * @namespace
 */
h.codec = {};


/**
 * @param {...} var_args
 */
h.nop = function(var_args) {};


/**
 * @param {!http.IncomingMessage} request
 * @param {string} payload
 * @return {!h.Request}
 */
h.createRequest = function(request, payload) {
  var decodedUrl = h.codec.decodeUrl(request.url || '');
  var hRequest = new h.Request(
      String(request.method || h.Method.GET),
      String(decodedUrl['pathname'] || '/'),
      request.headers || {});
  request.setPayload(h.codec.decodePayload(
      payload, hRequest.getContentType(), String(request.url || '')));
  return hRequest
};
