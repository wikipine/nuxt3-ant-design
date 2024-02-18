import { hash } from 'ohash';
import qs from 'qs';

const fetch = (type, { method, url, headers, params, data }) => {
  const options = {};
  options['method'] = method;
  options['params'] = params || {};
  if (data) {
    options['body'] = data;
  }
  if (headers) {
    options['headers'] = headers;
  }
  if (
    method === 'post' &&
    options['headers'] &&
    options['headers']['Content-Type'] === 'application/x-www-form-urlencoded' &&
    options['body']
  ) {
    // eslint-disable-next-line import/no-named-as-default-member
    options['body'] = qs.stringify(options['body']);
  }
  // 设置token
  // const authStore = useStore.authStore();
  // const userInfo = authStore.getUserInfo;
  // const token = userInfo['token'];
  // if(options['headers']) {
  //     options['headers']['access-token'] = token
  // } else {
  //     options['headers'] = {
  //         'access-token': token
  //     }
  // }
  // 链接处理
  const config = useRuntimeConfig();
  let reqUrl =
    type === 'server' ? config.public.VITE_SERVER_BASE_URL : config.public.VITE_CLIENT_BASE_URL;
  if (url) {
    reqUrl += url;
  }
  // 不设置key，始终拿到的都是第一个请求的值，参数一样则不会进行第二次请求
  const key = hash(JSON.stringify(options));
  if (options.params) {
    options['params']['t'] = new Date().getTime();
  } else {
    options['params'] = {
      t: new Date().getTime()
    };
  }
  return new Promise((resolve, reject) => {
    $fetch(reqUrl, { ...options, key })
      .then((res) => {
        // 错误交由指定业务处理
        if (!res.success) {
          // todo 通用鉴权可在此处理
          if (res.errorCode === 10011002) {
            /* empty */
          }
        }
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default new (class Http {
  get({ url, headers, params, data }) {
    return fetch('client', { method: 'get', url, headers, params, data });
  }

  post({ url, headers, params, data }) {
    return fetch('client', { method: 'post', url, headers, params, data });
  }

  serverGet({ url, headers, params, data }) {
    return fetch('server', { method: 'get', url, headers, params, data });
  }

  serverPost({ url, headers, params, data }) {
    return fetch('server', { method: 'post', url, headers, params, data });
  }
})();
