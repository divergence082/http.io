


/**
 * @param {number} statusCode
 * @param {string} payload
 * @param {!Object} headers
 * @constructor
 * @extends {h.Message}
 */
h.Response = function(statusCode, payload, headers) {
  h.Message.call(this, payload, headers);

  /**
   * @type {number}
   */
  this.__statusCode = statusCode;

};

util.inherits(h.Response, h.Message);


/**
 * @return {number}
 */
h.Response.prototype.getStatusCode = function() {
  return this.__statusCode;
};
