


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
  var requestUrl = url.parse(path) || {};

  /**
   * @type {string}
   */
  this.__method = method;

  /**
   * @type {string}
   */
  this.__path = path;

  /**
   * @type {string}
   */
  this.__pathname = requestUrl['pathname'] || '/';

  /**
   * @type {string}
   */
  this.__queryString = requestUrl['query'] || '';

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
  return this.__pathname;
};


/**
 * @return {string}
 */
h.Request.prototype.getQueryString = function() {
  return this.__queryString;
};
