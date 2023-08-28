import { User } from "../entity"

type PartialUser = Omit<User, 'password'>

export interface UserAccessToken {
  user: PartialUser
  token: string
  refreshToken: string
}