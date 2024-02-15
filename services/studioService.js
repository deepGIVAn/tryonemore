import httpservice from "@/config/httpservice";
import { deleteAllFiles, deleteFile } from "@/helpers/files";
import { toast } from "react-toastify";

class StudioServiceClass {
  createStudio = async (data) => {
    try {
      const res = await httpservice.post("studios", data);
      return res;
    } catch (error) {
      if (error?.response?.data?.message)
        toast.error(error?.response?.data?.message);
      else if (error?.response?.statusText)
        toast.error(error?.response?.statusText);
      console.log(error);
    }
  };

  getallStudios = async () => {
    try {
      const res = await httpservice.get("studios");
      return res;
    } catch (error) {
      if (error?.response?.data?.message)
        toast.error(error?.response?.data?.message);
      else if (error?.response?.statusText)
        toast.error(error?.response?.statusText);
      console.log(error);
    }
  };

  deleteStudio = async (id) => {
    try {
      let deleting = [];
      const studio = await this.getStudio(id);
      console.log(studio);
      studio?.data?.aadhar_doc_name &&
        deleting.push(deleteFile(studio?.data?.aadhar_doc_name));
      studio?.data?.gst_doc_name &&
        deleting.push(deleteFile(studio?.data?.gst_doc_name));
      studio?.data?.pan_doc_name &&
        deleting.push(deleteFile(studio?.data?.pan_doc_name));
      studio?.data?.studio_doc_name &&
        deleting.push(deleteFile(studio?.data?.studio_doc_name));
      studio?.data?.user_doc_name &&
        deleting.push(deleteFile(studio?.data?.user_doc_name));
      await deleteAllFiles(deleting);
      const res = await httpservice.delete(`studios/${id}`);
      return res;
    } catch (error) {
      if (error?.response?.data?.message)
        toast.error(error?.response?.data?.message);
      else if (error?.response?.statusText)
        toast.error(error?.response?.statusText);
      console.log(error);
    }
  };

  approveStudio = async (id) => {
    try {
      const res = await httpservice.post(`studios/${id}`);
      return res;
    } catch (error) {
      if (error?.response?.data?.message)
        toast.error(error?.response?.data?.message);
      else if (error?.response?.statusText)
        toast.error(error?.response?.statusText);
      console.log(error);
    }
  };

  getStudio = async (id) => {
    try {
      const res = await httpservice.get(`studios/${id}`);
      return res;
    } catch (error) {
      if (error?.response?.data?.message)
        toast.error(error?.response?.data?.message);
      else if (error?.response?.statusText)
        toast.error(error?.response?.statusText);
      console.log(error);
    }
  };

  getUserStudio = async (id) => {
    try {
      const res = await httpservice.get(`studios/user/${id}`);
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

export const StudioService = new StudioServiceClass();
