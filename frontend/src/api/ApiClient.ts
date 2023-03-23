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

/** Model Challenge */
export interface Challenge {
  /** @format double */
  parentId: number;
  type: string;
  /** @format double */
  goalCount: number;
  /** @format date-time */
  endAt: string;
  /** @format date-time */
  startAt: string;
  /** @format double */
  unitId: number;
  isActive: boolean;
  description: string;
  title: string;
  /** @format double */
  id: number;
}

export interface ApiResponseChallengeArray {
  data: Challenge[];
  status: {
    message: string;
    success: boolean;
  };
}

export interface GetAllChallengesQuery {
  q?: string;
  field?: string;
  order?: PAGINATION_ORDER;
  /** @format double */
  page?: number;
  /** @format double */
  perPage?: number;
  isActive?: boolean;
}

export enum ChallengeType {
  GoalMax = "GoalMax",
  GoalCount = "GoalCount",
}

export interface ChallengeViewModel {
  /** @format double */
  id: number;
  title: string;
  /** @format date-time */
  startAt: string;
  /** @format date-time */
  endAt: string;
  /** @format double */
  goalCount: number;
  type: ChallengeType;
  /** @format double */
  parentId?: number;
}

export interface ChallengeCreateModel {
  title: string;
  description: string;
  isActive: boolean;
  /** @format double */
  unitId: number;
  /** @format date-time */
  startAt?: string;
  /** @format date-time */
  endAt: string;
  /** @format double */
  goalCount: number;
  type: ChallengeType;
  /** @format double */
  parentId?: number;
}

export interface ChallengeUpdateModel {
  /** @format double */
  id: number;
  title: string;
  description: string;
  isActive: boolean;
  /** @format double */
  unitId: number;
  /** @format date-time */
  startAt: string;
  /** @format date-time */
  endAt: string;
  /** @format double */
  goalCount: number;
  type: ChallengeType;
  /** @format double */
  parentId?: number;
}

export interface Achievement {
  /** @format double */
  id?: number;
  title: string;
  imagePath: string;
  description: string;
  /** @format double */
  max_users: number;
}

export interface UnitCreateModel {
  /** @format double */
  id: number;
  title: string;
}

export interface UserGroupCreateModel {
  /** @format double */
  id: number;
  title: string;
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
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "/api" });
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
 * @baseUrl /api
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
      this.request<ApiResponseAny, any>({
        path: `/users`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name DeleteUserById
     * @request DELETE:/users/{id}
     * @secure
     */
    deleteUserById: (id: number, params: RequestParams = {}) =>
      this.request<ApiResponseAny, any>({
        path: `/users/${id}`,
        method: "DELETE",
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
    getAllChallenges: (
      query?: {
        q?: string;
        field?: string;
        order?: PAGINATION_ORDER;
        /** @format double */
        page?: number;
        /** @format double */
        perPage?: number;
        isActive?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiResponseChallengeArray, any>({
        path: `/challenges`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Challenge
     * @name Create
     * @request POST:/challenges
     * @secure
     */
    create: (data: ChallengeCreateModel, params: RequestParams = {}) =>
      this.request<ChallengeViewModel, any>({
        path: `/challenges`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Challenge
     * @name GetChallengeById
     * @request GET:/challenges/{id}
     * @secure
     */
    getChallengeById: (id: number, params: RequestParams = {}) =>
      this.request<ChallengeViewModel, any>({
        path: `/challenges/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Challenge
     * @name Update
     * @request PUT:/challenges/{id}
     * @secure
     */
    update: (id: number, data: ChallengeUpdateModel, params: RequestParams = {}) =>
      this.request<ChallengeCreateModel, any>({
        path: `/challenges/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Challenge
     * @name Delete
     * @request DELETE:/challenges/{id}
     * @secure
     */
    delete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/challenges/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Challenge
     * @name Join
     * @request POST:/challenges/{id}/join/{userId}
     * @secure
     */
    join: (id: number, userId: number, params: RequestParams = {}) =>
      this.request<ChallengeCreateModel, any>({
        path: `/challenges/${id}/join/${userId}`,
        method: "POST",
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
      this.request<ApiResponseAny, any>({
        path: `/achievements`,
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
     * @name Create
     * @request POST:/achievements
     * @secure
     */
    create: (data: Achievement, params: RequestParams = {}) =>
      this.request<Achievement, any>({
        path: `/achievements`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Achievement
     * @name GetAchievementById
     * @request GET:/achievements/{id}
     * @secure
     */
    getAchievementById: (id: number, params: RequestParams = {}) =>
      this.request<Achievement, any>({
        path: `/achievements/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Achievement
     * @name Update
     * @request PUT:/achievements/{id}
     * @secure
     */
    update: (id: number, data: Achievement, params: RequestParams = {}) =>
      this.request<Achievement, any>({
        path: `/achievements/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Achievement
     * @name Delete
     * @request DELETE:/achievements/{id}
     * @secure
     */
    delete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/achievements/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  units = {
    /**
     * No description
     *
     * @tags Unit
     * @name GetAllUnits
     * @request GET:/units
     * @secure
     */
    getAllUnits: (
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
        path: `/units`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Unit
     * @name Create
     * @request POST:/units
     * @secure
     */
    create: (data: UnitCreateModel, params: RequestParams = {}) =>
      this.request<UnitCreateModel, any>({
        path: `/units`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Unit
     * @name GetUnitById
     * @request GET:/units/{id}
     * @secure
     */
    getUnitById: (id: number, params: RequestParams = {}) =>
      this.request<UnitCreateModel, any>({
        path: `/units/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Unit
     * @name Update
     * @request PUT:/units/{id}
     * @secure
     */
    update: (id: number, data: UnitCreateModel, params: RequestParams = {}) =>
      this.request<UnitCreateModel, any>({
        path: `/units/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Unit
     * @name Delete
     * @request DELETE:/units/{id}
     * @secure
     */
    delete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/units/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  userGroups = {
    /**
     * No description
     *
     * @tags UserGroup
     * @name GetAllUserGroups
     * @request GET:/userGroups
     * @secure
     */
    getAllUserGroups: (
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
        path: `/userGroups`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserGroup
     * @name Create
     * @request POST:/userGroups
     * @secure
     */
    create: (data: UserGroupCreateModel, params: RequestParams = {}) =>
      this.request<UserGroupCreateModel, any>({
        path: `/userGroups`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserGroup
     * @name GetUserGroupById
     * @request GET:/userGroups/{id}
     * @secure
     */
    getUserGroupById: (id: number, params: RequestParams = {}) =>
      this.request<UserGroupCreateModel, any>({
        path: `/userGroups/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserGroup
     * @name Update
     * @request PUT:/userGroups/{id}
     * @secure
     */
    update: (id: number, data: UserGroupCreateModel, params: RequestParams = {}) =>
      this.request<UserGroupCreateModel, any>({
        path: `/userGroups/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserGroup
     * @name Delete
     * @request DELETE:/userGroups/{id}
     * @secure
     */
    delete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/userGroups/${id}`,
        method: "DELETE",
        secure: true,
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
