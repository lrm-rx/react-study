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

// 删除评论
export function deleteComment(id) {
  return request({
    url: "/comment/singledelete",
    method: "POST",
    headers: {
      isAuth: true,
    },
    data: {
      id,
    },
  });
}

// 通过文章id获取评论
export function getCommentListByArticleId({
  articleId,
  pageNum = 1,
  pageSize = 10,
}) {
  return request({
    url: "/comment/listbyarticleid",
    method: "POST",
    headers: {
      isShowLoading: false,
    },
    data: {
      articleId,
      pageNum,
      pageSize,
    },
  });
}
