import { Upload } from "@/api/interface/index";
import http from "@/api";

/**
 * @name 文件上传模块
 */
// * 头像上传
export const uploadImg = (params: FormData) => {
  return http.post<Upload.ResFileUrl>("/upload/avatar", params);
};
// * 封面上传
export const uploadCoverImg = (params: FormData) => {
  return http.post<Upload.ResFileUrl>("/upload/coverimage", params);
};
