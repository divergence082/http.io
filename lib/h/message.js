


/**
 * @param {string} payload
 * @param {!Object} headers
 * @constructor
 */
h.Message = function(payload, headers) {

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
h.Message.prototype.getPayload = function() {
  return this.__payload;
};


/**
 * @return {!Object}
 */
h.Message.prototype.getHeaders = function() {
  return this.__headers;
};
