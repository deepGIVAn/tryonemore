import { jwtDecode } from "jwt-decode";
import TokenHelper from "@/helpers/Token.helper";

const useAuth = () => {
  let refreshToken = TokenHelper.getToken();
  let user = TokenHelper.getUser();
  if (!refreshToken) return false;
  try {
    const decoded = jwtDecode(refreshToken);
    return (
      user === decoded.id && decoded.exp - Math.floor(Date.now() / 1000) > 0
    );
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const useAdmin = () => {
  let refreshToken = TokenHelper.getToken();
  let role = TokenHelper.getRole();
  if (!refreshToken) return false;
  try {
    const decoded = jwtDecode(refreshToken);
    return role === decoded.role && decoded.role === "admin";
  } catch (error) {
    console.log(error);
  }
  return false;
};

export default useAuth;
