


/**
 * @param {string} hostname
 * @param {number} port
 * @constructor
 */
h.Endpoint = function(hostname, port) {

  /**
   * @type {string}
   */
  this.__hostname = hostname;

  /**
   * @type {number}
   */
  this.__port = port;

};


/**
 * @type {string}
 */
h.Endpoint.DEFAULT_HOSTNAME = '';


/**
 * @type {number}
 */
h.Endpoint.DEFAULT_PORT = 80;


/**
 * @return {string}
 */
h.Endpoint.prototype.getHostname = function() {
  return this.__hostname;
};


/**
 * @return {number}
 */
h.Endpoint.prototype.getPort = function() {
  return this.__port;
};
