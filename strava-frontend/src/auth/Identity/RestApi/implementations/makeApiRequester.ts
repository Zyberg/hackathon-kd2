import Requester, {
  ResetPasswordForm,
  ResetPasswordRequestForm,
  RestApiResponse,
  UpdatePasswordForm,
} from '../types/MakeRequester';

import getRestApiConfig from '../getRestApiConfig';
import { api } from 'src/boot/axios';
import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';
import LocalStorageService from 'src/utility/LocalStorageService';

const makeApiRequester = (
  baseURL: string | undefined = undefined
): Requester => {
  const { endpoints: configuredEndpoints, baseUrl: configuredBaseUrl } =
    getRestApiConfig();
  baseURL = baseURL ?? configuredBaseUrl;

  function makeRestApiResponseSuccess<T>(
    response: AxiosResponse<T>
  ): RestApiResponse<T> {
    return {
      isFinished: true,
      statusCode: response.status,
      response: response,
      error: undefined,
      data: response.data as T,
      isFetching: false, //TODO: this is needed for the neat progress visualizations
    };
  }

  function makeRestApiResponseError<T>(
    error: AxiosError<T>
  ): RestApiResponse<T> {
    return {
      isFinished: true,
      statusCode: !!error.code ? +error.code : null,
      response: error.response!,
      error,
      data: error.response?.data as T,
      isFetching: false, //TODO: this is needed for the neat progress visualizations
    };
  }

  async function login(credentials: Record<string, string | number>) {
    console.log('clicked')
    //TODO: annoying type :)
    return await api.auth
      .loginPassword(credentials as any)
      .then(response => {
        if (response.data && response.data.data.token)
          LocalStorageService.setToken(response.data.data.token);

        return response;
      })
      .then(makeRestApiResponseSuccess)
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          return makeRestApiResponseError(error as AxiosError);
        }
      });
  }

  async function register(credentials: Record<string, string | number>) {
    //TODO: annoying type :)
    return await api.auth
      .signup(credentials as any)
      .then(makeRestApiResponseSuccess)
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          return makeRestApiResponseError(error as AxiosError);
        }
      });
  }

  async function logout() {
    //TODO: implement
    throw new Error('Not implemented');
  }

  async function getUser() {
    return await api.auth
      .user()
      .then(makeRestApiResponseSuccess)
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          return makeRestApiResponseError(error as AxiosError);
        }
      });
  }

  async function updatePassword(form: UpdatePasswordForm) {
    //TODO: implement
    throw new Error('Not implemented');
  }

  async function resetPassword(form: ResetPasswordForm) {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (typeof token !== 'string') {
      throw Error(
        '"token" missing: Unable to find the query paramater "token"'
      );
    }
    form.token = token;
    //TODO: implement
    throw new Error('Not implemented');
  }

  async function forgotPassword(form: ResetPasswordRequestForm) {
    //TODO: implement
    throw new Error('Not implemented');
  }

  const endpoints: RestApiEndpoints = configuredEndpoints;

  return {
    login,
    register,
    logout,
    getUser,
    resetPassword,
    forgotPassword,
    updatePassword,
  };
};

export { makeApiRequester as default, makeApiRequester };
