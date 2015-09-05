


/**
 * @param {string} method
 * @param {string} path
 * @param {string} payload
 * @param {!Object} headers
 * @constructor
 * @extends {h.Message}
 */
h.Request = function(method, path, payload, headers) {
  h.Message.call(this, payload, headers);

  /**
   * @type {string}
   */
  this.__method = method;

  /**
   * @type {string}
   */
  this.__path = path;

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
h.Request.prototype.getPath = function() {
  return this.__path;
};


/**
 * @return {string}
 */
h.Request.prototype.getPathname = function() {
  return (url.parse(this.__path) || {})['pathname'] || '/';
};


/**
 * @return {string}
 */
h.Request.prototype.getQueryString = function() {
  return (url.parse(this.__path) || {})['query'] || '';
};
