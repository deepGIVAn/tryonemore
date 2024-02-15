import httpservice from "@/config/httpservice";
import { toast } from "react-toastify";

class KeyServiceClass {
  getKey = async (key) => {
    try {
      const res = await httpservice.get(`productkeys/${key}`);
      return res;
    } catch (error) {
      // if (error?.response?.data?.message)
      //   toast.error(error?.response?.data?.message);
      // else if (error?.response?.statusText)
      //   toast.error(error?.response?.statusText);
      console.log(error);
    }
  };
}

export const KeyService = new KeyServiceClass();
