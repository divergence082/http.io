

/**
 * @param {string} method
 * @param {string} path
 * @param {!Object} headers
 * @constructor
 */
h.Request = function(method, path, headers) {

  /**
   * @type {string}
   */
  this.__method = method;

  /**
   * @type {string}
   */
  this.__path = path;

  /**
   * @type {!Object}
   */
  this.__headers = headers;

  /**
   * @type {!Object}
   */
  this.__payload = {};

};


/**
 * @return {string}
 */
h.Request.prototype.getMethod = function() {
  return this.__method;
};


/**
 * @return {!Object}
 */
h.Request.prototype.getHeaders = function() {
  return this.__headers;
};


/**
 * @return {string}
 */
h.Request.prototype.getPath = function() {
  return this.__path;
};


/**
 * @return {!Object}
 */
h.Request.prototype.getPayload = function() {
  return this.__payload
};


/**
 * @param {!Object} payload
 */
h.Request.prototype.setPayload = function(payload) {
  this.__payload = payload;
};


/**
 * @return {string}
 */
h.Request.prototype.getContentType = function() {
  return String(
      this.__headers['content-type'] || h.ContentType.APP_FORM_URLENCODED);
};
