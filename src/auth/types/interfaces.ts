export interface IJwtData {
  id: string;
  email: string;
}

export interface IAuthData extends IJwtData {
  accessToken: string;
}

