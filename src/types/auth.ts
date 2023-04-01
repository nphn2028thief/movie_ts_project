export interface ILoginInfo {
  username: string;
  password: string;
}

export interface IRegisterInfo extends ILoginInfo {
  firstName: string;
  lastName: string;
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
