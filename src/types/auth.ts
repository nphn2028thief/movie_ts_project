export enum ETYPE {
  login = "login",
  register = "register",
  changePassword = "changePassword",
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginInfo {
  username: string;
  password: string;
}

export interface IRegisterInfo {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface IUser {
  _id: string;
  password: string;
  firstName: string;
  lastName: string;
  image: string | undefined;
  favorites: number[];
  reviews: string[];
  createAt: Date;
  updateAt: Date;
}

export interface IUpdateAccountInfo
  extends Pick<IRegisterInfo, "firstName" | "lastName"> {
  accountId: string;
  image: string;
}

export interface IUpdatePassword {
  accountId: string;
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}
