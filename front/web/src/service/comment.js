import request from "./axios";

// 添加评论
export function createComment({ articleId, content }) {
  return request({
    url: "/comment/create",
    method: "POST",
    headers: {
      isAuth: true,
    },
    data: {
      articleId,
      content,
    },
  });
}
