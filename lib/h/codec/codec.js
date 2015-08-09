

/**
 * @param {string} urlString
 * @return {!url.URL}
 */
h.codec.decodeUrl = function(urlString) {
  var slashesDenoteHost = urlString.length > 2 && urlString.slice(0, 2) == '//';
  return url.parse(urlString, true, slashesDenoteHost);
};


/**
 * @param {?Object} query
 * @return {?Object}
 */
h.codec.decodeQuery = function(query) {
  var keys = Object.keys(query || {});

  if (keys.length === 1 && query[keys[0]] === '') {
    return h.codec.decodeJSON(keys[0]);
  } else {
    return query;
  }
};


/**
 * @param {!Object} data
 * @return {string}
 */
h.codec.encodeQuery = function(data) {
  return querystring.encode(data);
};


/**
 * @param {string} data
 * @param {string} contentType
 * @param {string=} opt_url
 * @return {!Object}
 */
h.codec.decodePayload = function(data, contentType, opt_url) {
  var decodedUrl = h.codec.decodeUrl(opt_url || '');
  var payload = h.codec.decodeQuery(decodedUrl['query'] || '') || {};

  if (contentType === h.io.ContentType.APP_FORM_URLENCODED) {
    var query = h.codec.decodeUrl('/?' + data)['query'] || '';
    return h.codec.__merge(payload, h.codec.decodeQuery(query) || {});
  } else if (contentType === h.io.ContentType.APP_JSON) {
    return h.codec.__merge(payload, h.codec.decodeJSON(data) || {});
  } else {
    return payload;
  }
};


/**
 * @param {!Object} payload
 * @param {string} contentType
 * @return {string}
 */
h.codec.encodePayload = function(payload, contentType) {
  if (contentType === h.io.ContentType.APP_FORM_URLENCODED) {
    return h.codec.encodeQuery(payload);
  } else if (contentType === h.io.ContentType.APP_JSON) {
    return h.codec.encodeJSON(payload);
  } else {
    return '';
  }
};


/**
 * @param {string} data
 * @return {?Object}
 */
h.codec.decodeJSON = function(data) {

  try {
    if (data !== '') {
      var parsedData = JSON.parse(data);
      if (parsedData instanceof Object) {
        return parsedData;
      } else {
        console.warn('WARN: [h.codec.decodeJSON] ' +
            '"Data is not valid" : "' + data + '"');
      }
    }
  } catch (error) {
    console.warn('WARN: [h.codec.decodeJSON] ' +
        '"' + String(error.message) + '" : "' + data + '"');
  }

  return null;
};


/**
 * @param {*} object
 * @return {string}
 */
h.codec.encodeJSON = function(object) {
  try {
    return JSON.stringify(object) || '';
  } catch (error) {
    console.warn('WARN: [h.codec.encodeJSON] ' +
        '"' + error.message + '" : "' + String(object) + '"');
  }

  return '';
};


/**
 * @param {!Object} obj1
 * @param {!Object} obj2
 * @return {!Object}
 */
h.codec.__merge = function(obj1, obj2) {
  var keys = Object.keys(obj2);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    obj1[key] = obj2[key];
  }

  return obj1;
};
