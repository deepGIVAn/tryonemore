import httpservice from "@/config/httpservice";
import TokenHelper from "@/helpers/Token.helper";
import { toast } from "react-toastify";

class AuthServiceClass {
  login = async ({ email, password }) => {
    try {
      const data = await httpservice.post("auth", { email, password });
      toast.success("Logged In Successfully!!");
      return data;
    } catch (error) {
      if (error?.response?.data?.message)
        toast.error(error?.response?.data?.message);
      else if (error?.response?.statusText)
        toast.error(error?.response?.statusText);
      console.log(error);
    }
  };

  logout = async () => {
    try {
      TokenHelper.deleteToken();
      TokenHelper.deleteUser();
      TokenHelper.deleteRole();
      toast.success("Logged out successfully!!");
      return true;
    } catch (error) {
      toast.error("Failed to Log Out!");
      console.log(error);
      return false;
    }
  };

  forgotpassword = async ({ email }) => {
    try {
      const res = await httpservice.post(`auth/forgot-password`, { email });
      return res;
    } catch (error) {
      if (error?.response?.data?.message)
        toast.error(error?.response?.data?.message);
      else if (error?.response?.statusText)
        toast.error(error?.response?.statusText);
      console.log(error);
    }
  };

  verifyToken = async ({ token }) => {
    try {
      const res = await httpservice.post(`auth/verify-token`, {
        verifyToken: token,
      });
      return res;
    } catch (error) {
      // if (error?.response?.data?.message)
      //   toast.error(error?.response?.data?.message);
      // else if (error?.response?.statusText)
      //   toast.error(error?.response?.statusText);
      console.log(error);
    }
  };

  resetPassword = async ({ token, password }) => {
    try {
      const res = await httpservice.post(`auth/reset-password`, {
        verifyToken: token,
        password,
      });
      return res;
    } catch (error) {
      if (error?.response?.data?.message)
        toast.error(error?.response?.data?.message);
      else if (error?.response?.statusText)
        toast.error(error?.response?.statusText);
      console.log(error);
    }
  };
}

export const AuthService = new AuthServiceClass();
