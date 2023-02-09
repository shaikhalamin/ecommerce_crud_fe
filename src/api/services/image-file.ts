import { axiosPrivate } from "../lib/axios-private";

export const uploadImage = (formData: FormData) => {
  return axiosPrivate.post(`/storage-file`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteImage = async (id: number) => {
  return axiosPrivate.delete(`/storage-file/${id}`);
};
