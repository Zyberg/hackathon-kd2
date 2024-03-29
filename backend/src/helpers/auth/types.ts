export interface UserInterface {
    id: number
    name: string
    email: string
    password: string
    email_verified_at?: Date
    password_reset_token: string | null
    blacklisted_tokens?: Array<string>
    createdAt: Date
    updatedAt: Date
    save: Function
  }
  
  export class MyError extends Error {
    public statusCode
    public data
    public title: string
  
    constructor(title: string, statusCode: number, data?: object) {
      super(title)
      Object.setPrototypeOf(this, MyError)
      this.statusCode = statusCode
      this.data = data
      this.title = title
    }
  }
  
  export interface RegisterUserBodyInterface {
    name: string
    email: string
    password: string
    confirm_password: string
  }
  
  export interface VerifyEmailInputsInterface {
    recipient: string
    name: string
    verifyLink: string
  }
  
  export interface FilteredUserInterface {
    id: number
    email: string
  }
  
  export interface ResetPasswordInputsInterface {
    recipient: string
    resetLink: string
    name: string
  }
  
  export type PasswordUpdatedInputsType = {
    recipient: string
    name: string
  }