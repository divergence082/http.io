

/**
 * @param {string} payload
 * @param {string} query
 * @param {string} contentType
 * @return {!Object}
 */
h.codec.decodePayload = function(payload, query, contentType) {
  if (contentType === h.io.ContentType.APP_FORM_URLENCODED) {
    return codec.form.decode(query) || {};
  } else if (contentType === h.io.ContentType.APP_JSON) {
    return codec.json.decode(payload) || {};
  } else {
    return {};
  }
};


/**
 * @param {!Object} payload
 * @param {string} contentType
 * @return {string}
 */
h.codec.encodePayload = function(payload, contentType) {
  if (contentType === h.io.ContentType.APP_FORM_URLENCODED) {
    return codec.form.encode(payload);
  } else if (contentType === h.io.ContentType.APP_JSON) {
    return codec.json.encode(payload);
  } else {
    return '';
  }
};
