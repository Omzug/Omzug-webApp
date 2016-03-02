import superagent from 'superagent';
import config from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    return 'http://' + config.apiHost + ':' + config.apiPort + adjustedPath;
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  return '/api' + adjustedPath;
}

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class _ApiClient {
  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path, { params, data, files } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        //add support for multipart request with attach file
        if (method=='post' && files !== undefined){
          files.forEach(file => request.attach(file.name, file))

          if(params){
            request.field('query', params)
          }
          if (data) {
            //request.field('data', data)
            //console.log('data is',data)
            for(var property in data){
              if(data.hasOwnProperty(property)){
                request.field(property , data[property])
              }
            }
            console.log('transfer data is', request)
          }

          // TODO pass along the session cookie to the API server to maintain session state.
          //if (__SERVER__ && req.get('cookie')) {
          //  request.set('cookie', req.get('cookie'));
          //}
        }else {
          if (params) {
            request.query(params);
          }
          // pass along the session cookie to the API server to maintain session state.
          if (__SERVER__ && req.get('cookie')) {
            request.set('cookie', req.get('cookie'));
          }
          if (data) {
            request.send(data);
          }
        }
        request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
      }));
  }
}

const ApiClient = _ApiClient;

export default ApiClient;
