import { ResPage, Comment } from "@/api/interface/index";
import http from "@/api";

// * 获取评论列表
export const getCommentList = (params: Comment.ReqCommentParams) => {
  return http.post<ResPage<Comment.ResCommentList>>("/comment/list", params);
};

// * 新增评论
export const addComment = (params: { id: string }) => {
  return http.post("/comment/create", params);
};

// * 删除评论
export const deleteComment = (params: { id: string[] }) => {
  return http.post(`/comment/delete`, params);
};
