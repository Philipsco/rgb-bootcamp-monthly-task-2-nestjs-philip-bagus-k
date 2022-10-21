export interface IPreLogin {
  email: string
}

export interface ILogin extends IPreLogin {
  password: string
}

export interface ILoginPayload {
  userId: number
  email: string
}
