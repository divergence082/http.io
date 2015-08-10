


/**
 * @param {string} method
 * @param {string} pathname
 * @param {!Object} headers
 * @constructor
 */
h.io.Message = function(method, pathname, headers) {

  /**
   * @type {string}
   */
  this.__method = method;

  /**
   * @type {string}
   */
  this.__pathname = pathname;

  /**
   * @type {!Object}
   */
  this.__headers = headers;

  /**
   * @type {!Object}
   */
  this.__payload = {};

  /**
   * @type {string}
   */
  this.__host = '';

  /**
   * @type {string}
   */
  this.__hostname = '';

  /**
   * @type {number}
   */
  this.__port = 80;

  /**
   * @type {string}
   */
  this.__localAddress = '';

  /**
   * @type {string}
   */
  this.__socketPath = '';

  /**
   * @type {?http.Agent}
   */
  this.__agent = null;

  /**
   * @type {string}
   */
  this.__auth = '';

  /**
   * @type {boolean}
   */
  this.__keepAlive = false;

  /**
   * @type {number}
   */
  this.__keepAliveMsecs = 1000;
};


/**
 * @return {string}
 */
h.io.Message.prototype.getMethod = function() {
  return this.__method;
};


/**
 * @return {!Object}
 */
h.io.Message.prototype.getHeaders = function() {
  return this.__headers;
};


/**
 * @return {string}
 */
h.io.Message.prototype.getPathname = function() {
  return this.__pathname;
};


/**
 * @return {string}
 */
h.io.Message.prototype.getPath = function() {
  if (this.__method === h.io.Method.GET ||
      this.__method === h.io.Method.DELETE) {
    var query = codec.form.encode(this.__payload);

    if (query) {
      return this.__pathname + '?' + query;
    }
  }

  return this.__pathname;
};


/**
 * @return {!Object}
 */
h.io.Message.prototype.getPayload = function() {
  return this.__payload;
};


/**
 * @return {string}
 */
h.io.Message.prototype.getContentType = function() {
  return String(
      this.__headers['content-type'] || h.io.ContentType.APP_FORM_URLENCODED);
};


/**
 * @param {!Object} payload
 */
h.io.Message.prototype.setPayload = function(payload) {
  this.__payload = payload;
};


/**
 * @param {string} host
 */
h.io.Message.prototype.setHost = function(host) {
  this.__host = host;
};


/**
 * @param {string} hostname
 */
h.io.Message.prototype.setHostname = function(hostname) {
  this.__hostname = hostname;
};


/**
 * @param {number} port
 */
h.io.Message.prototype.setPort = function(port) {
  this.__port = port;
};


/**
 * @param {string} localAddress
 */
h.io.Message.prototype.setLocalAddress = function(localAddress) {
  this.__localAddress = localAddress;
};


/**
 * @param {string} socketPath
 */
h.io.Message.prototype.setSocketPath = function(socketPath) {
  this.__socketPath = socketPath;
};


/**
 * @param {string} auth
 */
h.io.Message.prototype.setAuth = function(auth) {
  this.__auth = auth;
};


/**
 * @param {!http.Agent} agent
 */
h.io.Message.prototype.setAgent = function(agent) {
  this.__agent = agent;
};


/**
 *
 */
h.io.Message.prototype.setKeepAlive = function() {
  this.__keepAlive = true;
};


/**
 * @param {number} keepAliveMsecs
 */
h.io.Message.prototype.setKeepAliveMsecs = function(keepAliveMsecs) {
  this.__keepAliveMsecs = keepAliveMsecs;
};


/**
 * @return {!Object}
 */
h.io.Message.prototype.serialize = function() {
  return {
    'host': this.__host || undefined,
    'hostname': this.__hostname || undefined,
    'port': this.__port,
    'localAddress': this.__localAddress || undefined,
    'socketPath': this.__socketPath || undefined,
    'method': this.__method,
    'path': this.getPath(),
    'headers': this.__headers,
    'auth': this.__auth || undefined,
    'agent': this.__agent || undefined,
    'keepAlive': this.__keepAlive,
    'keepAliveMsecs': this.__keepAliveMsecs
  };
};
