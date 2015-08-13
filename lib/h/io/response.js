


/**
 * @param {number} status
 * @param {string} payload
 * @param {!Object} headers
 * @constructor
 * @extends {h.io.Message}
 */
h.io.Response = function(status, payload, headers) {
  h.io.Message.call(this, payload, headers);

  /**
   * @type {number}
   */
  this.__status = status;

};

util.inherits(h.io.Response, h.io.Message);


/**
 * @return {number}
 */
h.io.Response.prototype.getStatus = function() {
  return this.__status;
};
