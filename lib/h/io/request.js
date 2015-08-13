


/**
 * @param {string} method
 * @param {string} path
 * @param {string} payload
 * @param {!Object} headers
 * @constructor
 * @extends {h.io.Message}
 */
h.io.Request = function(method, path, payload, headers) {
  h.io.Message.call(this, payload, headers);

  /**
   * @type {string}
   */
  this.__method = method;

  /**
   * @type {string}
   */
  this.__path = path;

};

util.inherits(h.io.Request, h.io.Message);


/**
 * @return {string}
 */
h.io.Request.prototype.getMethod = function() {
  return this.__method;
};


/**
 * @return {string}
 */
h.io.Request.prototype.getPath = function() {
  return this.__path;
};
