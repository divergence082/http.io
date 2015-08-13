


/**
 * @param {string} payload
 * @param {!Object} headers
 * @constructor
 */
h.io.Message = function(payload, headers) {

  /**
   * @type {string}
   */
  this.__payload = payload;

  /**
   * @type {!Object}
   */
  this.__headers = headers;
};


/**
 * @return {string}
 */
h.io.Message.prototype.getPayload = function() {
  return this.__payload;
};


/**
 * @return {!Object}
 */
h.io.Message.prototype.getHeaders = function() {
  return this.__headers;
};
