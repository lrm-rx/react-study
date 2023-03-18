import { ResPage, Category } from "@/api/interface/index";
import http from "@/api";

// * 获取分类列表
export const getCategoryList = (params: Category.ReqCategoryParams) => {
  return http.post<ResPage<Category.ResCategoryList>>("/category/list", params);
};

// 获取所有分类信息
export const getAllCategory = () => {
  return http.get("/category/findallcategory");
};

// 通过id获取分类信息
export const getCategoryById = (params: { id: number }) => {
  return http.get("/category/findcategory", params);
};

// * 新增分类
export const addCategory = (params: { id: string }) => {
  return http.post("/category/create", params);
};

// * 编辑分类
export const editCategory = (params: { id: string }) => {
  return http.post(`/category/update/${params.id}`, params);
};

// * 删除分类
export const deleteCategory = (params: { id: string[] }) => {
  return http.post(`/category/delete`, params);
};
