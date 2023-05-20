import {
  ILoginInfo,
  IRegisterInfo,
  IUpdateAccountInfo,
  IUpdatePassword,
  IUser,
} from "../../types/auth";
import privateClient from "../client/private_client";
import publicClient from "../client/public_client";

const authEndpoints = {
  register: "/auth/register",
  login: "/auth/login",
  getMe: "/auth/me",
  updateMe: "/auth/updateMe",
  changePassword: "/auth/changePassword",
};

const authApi = {
  register: (payload: IRegisterInfo) => {
    return publicClient.post<{ message: string }>(
      authEndpoints.register,
      payload
    );
  },

  login: (payload: ILoginInfo) => {
    return publicClient.post<{ accessToken: string }>(
      authEndpoints.login,
      payload
    );
  },

  getMe: () => {
    return privateClient.get<IUser>(authEndpoints.getMe);
  },

  updateMe: async (payload: IUser) => {
    return privateClient.patch<IUser>(authEndpoints.updateMe, payload);
  },

  changePassword: (passwordInfo: IUpdatePassword) => {
    return privateClient.put<{ message: string; newPassword?: string }>(
      authEndpoints.changePassword,
      passwordInfo
    );
  },
};

export default authApi;
