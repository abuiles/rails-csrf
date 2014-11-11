var __config__ = {
  url: '/api/csrf'
};

export function set(key, value) {
  __config__[key] = value;
}

export function get(key) {
  return __config__[key];
}

export function setCsrfUrl(csrfURL) {
  set('url', csrfURL);
}
