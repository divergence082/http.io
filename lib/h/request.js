


/**
 * @param {string} method
 * @param {string} pathname
 * @param {string} payload
 * @param {!Object} headers
 * @constructor
 * @extends {h.Message}
 */
h.Request = function(method, pathname, payload, headers) {
  h.Message.call(this, payload, headers);

  /**
   * @type {string}
   */
  this.__method = method;

  /**
   * @type {string}
   */
  this.__pathname = pathname;

};

util.inherits(h.Request, h.Message);


/**
 * @return {string}
 */
h.Request.prototype.getMethod = function() {
  return this.__method;
};


/**
 * @return {string}
 */
h.Request.prototype.getPathname = function() {
  return this.__pathname;
};
