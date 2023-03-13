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

/** Model User */
export interface User {
  password: string;
  name: string | null;
  email: string;
  /** @format double */
  id: number;
}

export interface PaginationResult {
  /** @format double */
  page: number;
  /** @format double */
  pages: number;
  /** @format double */
  limit: number;
  /** @format double */
  items: number;
}

export interface ApiResponseMetaUserArray {
  success: boolean;
  message: string;
  data: User[] | null;
  meta: PaginationResult | null;
}

export type ApiResponseUserArray = ApiResponseMetaUserArray;

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

/** Model Challenge */
export interface Challenge {
  /** @format double */
  unitId: number;
  isActive: boolean;
  description: string;
  title: string;
  /** @format double */
  id: number;
}

export interface ChallengeResponse {
  success: boolean;
  message: string;
  data: Challenge[] | null;
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

export interface ApiResponseMetaAchievementArray {
  success: boolean;
  message: string;
  data: Achievement[] | null;
  meta: PaginationResult | null;
}

export type ApiResponseAchievementArray = ApiResponseMetaAchievementArray;

export interface ApiResponseMetaUser {
  success: boolean;
  message: string;
  data: User | null;
  meta: PaginationResult | null;
}

export type ApiResponseUser = ApiResponseMetaUser;

export interface UserCreateRequest {
  name: string;
  email: string;
  password: string;
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
  users = {
    /**
     * No description
     *
     * @tags User
     * @name GetAllUsers
     * @request GET:/users
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
      this.request<ApiResponseUserArray, any>({
        path: `/users`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  challenges = {
    /**
     * No description
     *
     * @tags Challenge
     * @name GetAllChallenges
     * @request GET:/challenges
     * @secure
     */
    getAllChallenges: (params: RequestParams = {}) =>
      this.request<ChallengeResponse, any>({
        path: `/challenges`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  achievements = {
    /**
     * No description
     *
     * @tags Achievement
     * @name GetAllAchievements
     * @request GET:/achievements
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
        path: `/achievements`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  authentication = {
    /**
     * No description
     *
     * @tags Authentication
     * @name Signup
     * @request POST:/authentication/signup
     */
    signup: (data: UserCreateRequest, params: RequestParams = {}) =>
      this.request<ApiResponseUser, any>({
        path: `/authentication/signup`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
