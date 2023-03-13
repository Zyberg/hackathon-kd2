import User from './User'

export interface RestApiResponse<T> {
  isFinished: boolean
  statusCode: number | null
  response: Response | null
  asJson: () => Record<string | number, unknown> | undefined
  error: unknown
  data: T
  isFetching: boolean
}

export interface ResetPasswordForm {
  email: string
  password: string
  password_confirmation: string
  token?: string
}

export interface ResetPasswordRequestForm {
  email: string
}

export interface UpdatePasswordForm {
  current_password: string
  password: string
  password_confirmation: string
}

export default interface MakeRequesterReturn {
  login: (credentials: Record<string, string | number>) => Promise<RestApiResponse<unknown>>,
  register: (credentials: Record<string, string | number>) => Promise<RestApiResponse<unknown>>,
  logout: () => Promise<RestApiResponse<unknown>>,
  // fetchCsrfToken: () => Promise<RestApiResponse<unknown>>,
  getUser: () => Promise<RestApiResponse<User>>,
  forgotPassword: (form: ResetPasswordRequestForm) => Promise<RestApiResponse<unknown>>,
  resetPassword: (form: ResetPasswordForm) => Promise<RestApiResponse<unknown>>,
  updatePassword: (form: UpdatePasswordForm) => Promise<RestApiResponse<unknown>>
}

export type MakeRequester = (url?: string) => MakeRequesterReturn
