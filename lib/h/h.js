

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
 * @param {number=} opt_status
 * @return {!h.Response}
 */
h.createResponse = function(payload, headers, opt_status) {
  return new h.Response(opt_status || status.Code.OK, payload, headers);
};
