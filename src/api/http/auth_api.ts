import {
  ILoginInfo,
  IRegisterInfo,
  IUpdateAccountInfo,
  IUpdatePassword,
} from "../../types/auth";
import privateClient from "../client/private_client";
import publicClient from "../client/public_client";

const authEndpoints = {
  register: "/auth/register",
  login: "/auth/login",
  getMe: "/auth/me",
  updateMe: "/auth/updateMe",
  changePassword: "/auth/changePassword",
  refreshToken: "/auth/refreshToken",
  //   getFavorites: "/favorites",
  //   addFavorite: "/favorites",
  //   deleteFavorite: "/favorite/:favoriteId",
};

const authApi = {
  register: async (registerInfo: IRegisterInfo) => {
    try {
      const response = await publicClient.post(
        authEndpoints.register,
        registerInfo
      );
      return response;
    } catch (error) {
      return error;
    }
  },

  login: async (loginInfo: ILoginInfo) => {
    try {
      const response = await publicClient.post(authEndpoints.login, loginInfo);
      return response;
    } catch (error) {
      return error;
    }
  },

  getMe: async () => {
    try {
      const response = await privateClient.get(authEndpoints.getMe);
      return response;
    } catch (error) {
      return error;
    }
  },

  updateMe: async (accountInfo: IUpdateAccountInfo) => {
    try {
      const response = await privateClient.patch(
        authEndpoints.updateMe,
        accountInfo
      );
      return response;
    } catch (error) {
      return error;
    }
  },

  changePassword: async (passwordInfo: IUpdatePassword) => {
    try {
      const response = await privateClient.put(
        authEndpoints.changePassword,
        passwordInfo
      );
      return response;
    } catch (error) {
      return error;
    }
  },

  refreshToken: async (refreshToken: string) => {
    try {
      const response = await privateClient.post(
        authEndpoints.refreshToken,
        refreshToken
      );
      return response;
    } catch (error) {
      return error;
    }
  },
};

export default authApi;
