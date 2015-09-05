


/**
 * @param {status.Code} statusCode
 * @param {string} payload
 * @param {!Object} headers
 * @constructor
 * @extends {h.Message}
 */
h.Response = function(statusCode, payload, headers) {
  h.Message.call(this, payload, headers);

  /**
   * @type {status.Code}
   */
  this.__statusCode = statusCode;

};

util.inherits(h.Response, h.Message);


/**
 * @return {status.Code}
 */
h.Response.prototype.getStatusCode = function() {
  return this.__statusCode;
};
