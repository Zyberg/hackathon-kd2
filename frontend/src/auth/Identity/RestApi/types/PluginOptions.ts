import { MakeRequester } from './MakeRequester'
import UseAuthState from './UseAuthState'

export interface RestApiEndpoints {
  login: string
  register: string
  logout: string
  getUser: string
  resetPassword: string
  forgotPassword: string
  password: string
}

export interface RestApiOptionsEndpoints {
  login?: string
  register?: string
  logout?: string
  getUser?: string
  resetPassword?: string
  forgotPassword?: string
  password?: string
}

export interface RestApiConfig {
  makeRequester: MakeRequester
  useAuthState: UseAuthState
  baseUrl: string
  endpoints: RestApiEndpoints
}

export interface PluginOptions {
  baseUrl?: string
  makeRequester?: MakeRequester
  useAuthState?: UseAuthState
  endpoints?: RestApiEndpoints
}

export default PluginOptions
