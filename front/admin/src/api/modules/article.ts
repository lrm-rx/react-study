import { ResPage, Article } from "@/api/interface/index";
import http from "@/api";

// * 获取文章列表
export const getArticleList = (params: Article.ReqArticleParams) => {
  return http.post<ResPage<Article.ResArticleList>>("/article/list", params);
};

// 通过id获取文章信息
export const getArticleById = (params: { id: number }) => {
  return http.get("/article/detail", params);
};

// * 新增文章
export const addArticle = (params: any) => {
  return http.post("/article/create", params);
};

// * 编辑文章
export const editArticle = (params: { id: string }) => {
  return http.post(`/article/update/${params.id}`, params);
};

// * 删除文章
export const deleteArticle = (params: { id: string[] }) => {
  return http.post(`/article/delete`, params);
};
