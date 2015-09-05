

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
 * @typedef {!function(!h.ResponseHandler, !h.ResponseHandler, !h.Request)}
 */
h.Router;


/**
 * @typedef {!function(!h.Response)}
 */
h.ResponseHandler;


/**
 * @param {string} payload
 * @param {!Object} headers
 * @param {status.Code=} opt_status
 * @return {!h.Response}
 */
h.createResponse = function(payload, headers, opt_status) {
  return new h.Response(opt_status || status.Code.OK, payload, headers);
};


/**
 * @param {string} payload
 * @param {!Object} headers
 * @param {string=} opt_pathname
 * @param {Method=} opt_method
 * @return {h.Request}
 */
h.createRequest = function(payload, headers, opt_pathname, opt_method) {
  return new h.Request(
      opt_method || Method.GET, opt_pathname || '/', payload, headers);
};
