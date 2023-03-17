import { ResPage, Tag } from "@/api/interface/index";
import http from "@/api";

// * 获取标签列表
export const getTagList = (params: Tag.ReqTagParams) => {
  return http.post<ResPage<Tag.ResTagList>>("/tag/list", params);
};

// * 新增标签
export const addTag = (params: { id: string }) => {
  return http.post("/tag/create", params);
};

// * 编辑标签
export const editTag = (params: { id: string }) => {
  return http.post(`/tag/update/${params.id}`, params);
};

// * 删除标签
export const deleteTag = (params: { id: string[] }) => {
  return http.post(`/tag/delete`, params);
};
