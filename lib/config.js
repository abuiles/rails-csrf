var Config = ENV.railsCsrf || {};

export default {
  csrfURL: Config.csrfURL || 'api/csrf'
};
