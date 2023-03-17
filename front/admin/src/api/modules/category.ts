import { ResPage, Category } from "@/api/interface/index";
import qs from "qs";
import http from "@/api";

// * 获取分类列表
export const getCategoryList = (params: Category.ReqCategoryParams) => {
  return http.get<ResPage<Category.ResCategoryList>>(
    `/Category/list${qs.stringify(params, { addQueryPrefix: true })}`
  );
};

// 通过id获取分类信息
export const getCategoryById = (params: { id: number }) => {
  return http.get("/Category/findCategory", params);
};

// * 新增分类
export const addCategory = (params: { id: string }) => {
  return http.post("Category/create", params);
};

// * 编辑分类
export const editCategory = (params: { id: string }) => {
  return http.post(`Category/update/${params.id}`, params);
};

// * 删除分类
export const deleteCategory = (params: { id: string[] }) => {
  return http.post(`/Category/delete`, params);
};
