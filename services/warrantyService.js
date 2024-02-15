import httpservice from "@/config/httpservice";
import { deleteAllFiles, deleteFile } from "@/helpers/files";
import { toast } from "react-toastify";

class WarrantyServiceClass {
  createWarranty = async (data) => {
    try {
      const res = await httpservice.post("warranties", data);
      return res;
    } catch (error) {
      if (error?.response?.data?.message)
        toast.error(error?.response?.data?.message);
      else if (error?.response?.statusText)
        toast.error(error?.response?.statusText);
      console.log(error);
    }
  };

  getallWarranties = async () => {
    try {
      const res = await httpservice.get("warranties");
      return res;
    } catch (error) {
      if (error?.response?.data?.message)
        toast.error(error?.response?.data?.message);
      else if (error?.response?.statusText)
        toast.error(error?.response?.statusText);
      console.log(error);
    }
  };

  approveWarranty = async (id) => {
    try {
      const res = await httpservice.post(`warranties/${id}`);
      return res;
    } catch (error) {
      if (error?.response?.data?.message)
        toast.error(error?.response?.data?.message);
      else if (error?.response?.statusText)
        toast.error(error?.response?.statusText);
      console.log(error);
    }
  };

  deleteWarranty = async (id) => {
    try {
      let deleting = [];
      const warranty = await this.getWarranty(id);
      console.log(warranty);
      warranty?.data?.photo1name &&
        deleting.push(deleteFile(warranty?.data?.photo1name));
      warranty?.data?.photo2name &&
        deleting.push(deleteFile(warranty?.data?.photo2name));
      warranty?.data?.photo3name &&
        deleting.push(deleteFile(warranty?.data?.photo3name));
      warranty?.data?.photo4name &&
        deleting.push(deleteFile(warranty?.data?.photo4name));
      warranty?.data?.photo5name &&
        deleting.push(deleteFile(warranty?.data?.photo5name));
      const check = await deleteAllFiles(deleting);
      const res = await httpservice.delete(`warranties/${id}`);
      return res;
    } catch (error) {
      if (error?.response?.data?.message)
        toast.error(error?.response?.data?.message);
      else if (error?.response?.statusText)
        toast.error(error?.response?.statusText);
      console.log(error);
    }
  };

  getWarranty = async (id) => {
    try {
      const res = await httpservice.get(`warranties/${id}`);
      return res;
    } catch (error) {
      if (error?.response?.data?.message)
        toast.error(error?.response?.data?.message);
      else if (error?.response?.statusText)
        toast.error(error?.response?.statusText);
      console.log(error);
    }
  };

  getUserWarranties = async (id) => {
    try {
      const res = await httpservice.get(`warranties/user/${id}`);
      return res;
    } catch (error) {
      if (error?.response?.data?.message)
        toast.error(error?.response?.data?.message);
      else if (error?.response?.statusText)
        toast.error(error?.response?.statusText);
      console.log(error);
    }
  };

  checkWarranty = async (vehNo) => {
    try {
      const res = await httpservice.get(`warranties/checkWarranty/${vehNo}`);
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

export const WarrantyService = new WarrantyServiceClass();
