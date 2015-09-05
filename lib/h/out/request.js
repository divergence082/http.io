


/**
 * @param {!h.Endpoint} endpoint
 * @param {string} method
 * @param {string} pathname
 * @param {string} query
 * @param {string} payload
 * @param {!Object} headers
 * @constructor
 * @extends {h.Request}
 */
h.out.Request = function(endpoint, method, pathname, query, payload, headers) {
  h.Request.call(this, method, pathname, payload, headers);

  /**
   * @type {!h.Endpoint}
   */
  this.__endpoint = endpoint;

  /**
   * @type {string}
   */
  this.__query = query;

  /**
   * @type {string}
   */
  this.__localAddress = '';

  /**
   * @type {string}
   */
  this.__socketPath = '';

  /**
   * @type {string}
   */
  this.__auth = '';

  /**
   * @type {?http.Agent}
   */
  this.__agent = null;

  /**
   * @type {boolean}
   */
  this.__keepAlive = false;

  /**
   * @type {number}
   */
  this.__keepAliveMsecs = 1000;

};

util.inherits(h.out.Request, h.Request);


/**
 * @param {string} localAddress
 */
h.out.Request.prototype.setLocalAddress = function(localAddress) {
  this.__localAddress = localAddress;
};


/**
 * @param {string} socketPath
 */
h.out.Request.prototype.setSocketPath = function(socketPath) {
  this.__socketPath = socketPath;
};


/**
 * @param {string} auth
 */
h.out.Request.prototype.setAuth = function(auth) {
  this.__auth = auth;
};


/**
 * @param {!http.Agent} agent
 */
h.out.Request.prototype.setAgent = function(agent) {
  this.__agent = agent;
};


/**
 * @param {boolean} keepAlive
 */
h.out.Request.prototype.setKeepAlive = function(keepAlive) {
  this.__keepAlive = keepAlive;
};


/**
 * @return {string}
 */
h.out.Request.prototype.getPath = function() {
  return this.getPath() + '?' + this.__query;
};


/**
 * @return {!Object}
 */
h.out.Request.prototype.getOptions = function() {
  var options = {
    'hostname': this.__endpoint.getHostname(),
    'port': this.__endpoint.getPort(),
    'method': this.getMethod(),
    'headers': this.getHeaders()
  };

  if (this.__localAddress) {
    options['localAddress'] = this.__localAddress;
  }

  if (this.__socketPath) {
    options['socketPath'] = this.__socketPath;
  }

  if (this.__auth) {
    options['auth'] = this.__auth;
  }

  if (this.__agent) {
    options['agent'] = this.__agent;
  }

  if (this.__keepAlive) {
    options['keepAlive'] = this.__keepAlive;

    if (this.__keepAliveMsecs !== 1000) {
      options['keepAliveMsecs'] = this.__keepAliveMsecs;
    }
  }

  options['path'] = this.getPath();

  return options;
};
