import httpservice from "@/config/httpservice";
import { toast } from "react-toastify";

class UserServiceClass {
  createUser = async (data) => {
    try {
      const res = await httpservice.post("users", data);
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

export const UserService = new UserServiceClass();
