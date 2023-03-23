/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ApiResponseAny {
  data: any[];
  status: {
    message: string;
    success: boolean;
  };
}

export enum PAGINATION_ORDER {
  ASC = "ASC",
  DESC = "DESC",
}

export interface DataTableQuery {
  q?: string;
  field?: string;
  order?: PAGINATION_ORDER;
  /** @format double */
  page?: number;
  /** @format double */
  perPage?: number;
}

/** Model Achievement */
export interface Achievement {
  /** @format double */
  max_users: number;
  description: string;
  imagePath: string;
  title: string;
  /** @format double */
  id: number;
}

export interface ApiResponseAchievementArray {
  data: Achievement[];
  status: {
    message: string;
    success: boolean;
  };
}

export interface FilteredUserInterface {
  /** @format double */
  id: number;
  email: string;
}

export interface AuthenticationServiceTokenResponseData {
  token: string;
  /** @format double */
  expires_in: number;
  user: FilteredUserInterface;
}

export interface ApiResponseAuthenticationServiceTokenResponseData {
  data: AuthenticationServiceTokenResponseData;
  status: {
    message: string;
    success: boolean;
  };
}

export interface UserLoginRequest {
  /** @format email */
  email: string;
  password: string;
}

/** Model User */
export interface User {
  /** @format double */
  roleId: number;
  password: string;
  name: string | null;
  email: string;
  /** @format double */
  id: number;
}

export interface ApiResponseUser {
  /** Model User */
  data: User;
  status: {
    message: string;
    success: boolean;
  };
}

export enum AuthScope {
  Admin = "Admin",
  User = "User",
}

export interface UserCreateRequest {
  name: string;
  email: string;
  password: string;
  scope: AuthScope;
}

export interface UserViewModel {
  /** @format double */
  id: number;
  name: string | null;
  /** @format email */
  email: string;
  role: string;
}

export interface ApiResponseUserViewModel {
  data: UserViewModel;
  status: {
    message: string;
    success: boolean;
  };
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "/" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title rest-express
 * @version 1.0.0
 * @license MIT
 * @baseUrl /
 * @contact
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags User
     * @name GetAllUsers
     * @request GET:/api/users
     * @secure
     */
    getAllUsers: (
      query?: {
        q?: string;
        field?: string;
        order?: PAGINATION_ORDER;
        /** @format double */
        page?: number;
        /** @format double */
        perPage?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiResponseAny, any>({
        path: `/api/users`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Achievement
     * @name GetAllAchievements
     * @request GET:/api/achievements
     * @secure
     */
    getAllAchievements: (
      query?: {
        q?: string;
        field?: string;
        order?: PAGINATION_ORDER;
        /** @format double */
        page?: number;
        /** @format double */
        perPage?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiResponseAchievementArray, any>({
        path: `/api/achievements`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags Authentication
     * @name LoginStrava
     * @request POST:/auth/login/strava
     */
    loginStrava: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/login/strava`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name LoginPassword
     * @request POST:/auth/login/password
     */
    loginPassword: (data: UserLoginRequest, params: RequestParams = {}) =>
      this.request<ApiResponseAuthenticationServiceTokenResponseData, void>({
        path: `/auth/login/password`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name RefreshToken
     * @request POST:/auth/tokens/refresh
     */
    refreshToken: (params: RequestParams = {}) =>
      this.request<ApiResponseAuthenticationServiceTokenResponseData, void>({
        path: `/auth/tokens/refresh`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name Signup
     * @request POST:/auth/signup
     */
    signup: (data: UserCreateRequest, params: RequestParams = {}) =>
      this.request<ApiResponseUser, any>({
        path: `/auth/signup`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name User
     * @request GET:/auth/user
     */
    user: (params: RequestParams = {}) =>
      this.request<ApiResponseUserViewModel, any>({
        path: `/auth/user`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name Logout
     * @request POST:/auth/logout
     */
    logout: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/logout`,
        method: "POST",
        ...params,
      }),
  };
}
