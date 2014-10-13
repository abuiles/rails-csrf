import Service from './service';
import Config  from './config';

function setCsrfUrl(csrfURL) {
  Config.set('url', csrfURL);
}

export {
  Service,
  setCsrfUrl
};
