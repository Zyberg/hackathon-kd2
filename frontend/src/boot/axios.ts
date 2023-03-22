import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { Api } from 'src/api/ApiClient';
import LocalStorageService from 'src/utility/LocalStorageService';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

const api = new Api({
  baseURL: '/api',
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true,
});

api.instance.interceptors.request.use(
  (config) => {
    if (!config.headers) {
      config.headers = {};
    }

    const token = LocalStorageService.getAccessToken();
    if (!!token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (error.request.responseURL.includes('tokens/refresh')) throw error;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      return api.auth.refreshToken().then((res) => {
        if (res.status === 200) {
          LocalStorageService.setToken(res.data.data.token);

          api.instance.defaults.headers[
            'Authorization'
          ] = `Bearer ${LocalStorageService.getAccessToken()}`;

          return api.instance(originalRequest);
        }
      });
    }
  }
);

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
