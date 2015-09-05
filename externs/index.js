/**
 * @namespace
 */
var h = {};


/**
 * @namespace
 */
h.in = {};


/**
 * @namespace
 */
h.out = {};


/**
 * @typedef {!function(!h.ResponseHandler, !h.ResponseHandler, !h.Request)}
 */
h.Router;


/**
 * @typedef {!function(!h.Response)}
 */
h.ResponseHandler;


/**
 * @param {string} payload
 * @param {!Object} headers
 * @param {number=} opt_status
 * @return {!h.Response}
 */
h.createResponse = function(payload, headers, opt_status) {};


/**
 * @param {string} hostname
 * @param {number} port
 * @constructor
 */
h.Endpoint = function(hostname, port) {};


/**
 * @type {string}
 */
h.Endpoint.DEFAULT_HOSTNAME;


/**
 * @type {number}
 */
h.Endpoint.DEFAULT_PORT;


/**
 * @return {string}
 */
h.Endpoint.prototype.getHostname = function() {};


/**
 * @return {number}
 */
h.Endpoint.prototype.getPort = function() {};


/**
 * @param {string} payload
 * @param {!Object} headers
 * @constructor
 */
h.Message = function(payload, headers) {};


/**
 * @return {string}
 */
h.Message.prototype.getPayload = function() {};


/**
 * @return {!Object}
 */
h.Message.prototype.getHeaders = function() {};


/**
 * @param {string} method
 * @param {string} path
 * @param {string} payload
 * @param {!Object} headers
 * @constructor
 * @extends {h.Message}
 */
h.Request = function(method, path, payload, headers) {};


/**
 * @return {string}
 */
h.Request.prototype.getMethod = function() {};


/**
 * @return {string}
 */
h.Request.prototype.getPath = function() {};


/**
 * @return {string}
 */
h.Request.prototype.getPathname = function() {};


/**
 * @return {string}
 */
h.Request.prototype.getQueryString = function() {};


/**
 * @param {number} statusCode
 * @param {string} payload
 * @param {!Object} headers
 * @constructor
 * @extends {h.Message}
 */
h.Response = function(statusCode, payload, headers) {};


/**
 * @return {number}
 */
h.Response.prototype.getStatusCode = function() {};


/**
 * @param {string} hostname
 * @param {number} port
 * @param {!h.Router} router
 * @param {!function(...?)} errorHandler
 * @return {h.in.Endpoint}
 */
h.in.createEndpoint = function(hostname, port, router, errorHandler) {};


/**
 * @param {string} payload
 * @param {!Object} headers
 * @param {string=} opt_path
 * @param {string=} opt_method
 * @return {!h.Request}
 */
h.in.createRequest = function(payload, headers, opt_path, opt_method) {};


/**
 * @param {string} payload
 * @param {!Object} headers
 * @param {number=} opt_status
 * @return {!h.Response}
 */
h.in.createResponse = h.createResponse;



/**
 * @param {string} hostname
 * @param {number} port
 * @constructor
 */
h.in.Endpoint = function(hostname, port) {};


/**
 *
 */
h.in.Endpoint.prototype.listen = function() {};


/**
 * @param {!h.Router} router
 */
h.in.Endpoint.prototype.setRouter = function(router) {};


/**
 * @param {!function(...?)} handler
 */
h.in.Endpoint.prototype.setErrorHandler = function(handler) {};


/**
 * @param {!h.ResponseHandler} complete
 * @param {!function(!Error)} cancel
 * @param {!h.out.Request} request
 */
h.out.send = function(complete, cancel, request) {};


/**
 * @param {number} limit
 */
h.out.setAttemptsLimit = function(limit) {};


/**
 * @param {number} timeout
 */
h.out.setAttemptsTimeout = function(timeout) {};


/**
 * @param {string} host
 * @param {number} port
 * @param {string} path
 * @param {string=} opt_payload
 * @param {!Object=} opt_headers
 * @param {Method=} opt_method
 * @return {h.Request}
 */
h.out.createRequest = function(
    host, port, path, opt_payload, opt_headers, opt_method) {};


/**
 * @param {string} payload
 * @param {!Object} headers
 * @param {number=} opt_status
 * @return {!h.Response}
 */
h.out.createResponse = h.createResponse;


/**
 * @type {number}
 */
h.out.__ATTEMPTS_TIMEOUT = 2000;


/**
 * @type {number}
 */
h.out.__ATTEMPTS_LIMIT = 6;



/**
 * @param {!h.Endpoint} endpoint
 * @param {string} method
 * @param {string} path
 * @param {string} payload
 * @param {!Object} headers
 * @constructor
 * @extends {h.Request}
 */
h.out.Request = function(endpoint, method, path, payload, headers) {};


/**
 * @param {string} localAddress
 */
h.out.Request.prototype.setLocalAddress = function(localAddress) {};


/**
 * @param {string} socketPath
 */
h.out.Request.prototype.setSocketPath = function(socketPath) {};


/**
 * @param {string} auth
 */
h.out.Request.prototype.setAuth = function(auth) {};


/**
 * @param {!http.Agent} agent
 */
h.out.Request.prototype.setAgent = function(agent) {};


/**
 * @param {boolean} keepAlive
 */
h.out.Request.prototype.setKeepAlive = function(keepAlive) {};


/**
 * @return {!Object}
 */
h.out.Request.prototype.getOptions = function() {};




