// * 请求响应参数(不包含data)
export interface Result {
  code: string;
  msg: string;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
  data: T;
}

// * 分页响应参数
export interface ResPage<T> {
  list: T[];
  pageNum: number;
  pageSize: number;
  total: number;
}

// * 分页请求参数
export interface ReqPage {
  pageNum: number;
  pageSize: number;
}

// * 文件上传模块
export namespace Upload {
  export interface ResFileUrl {
    fileUrl: string;
  }
}

// * 登录模块
export namespace Login {
  export interface VerityCode {
    veritycode: string;
  }
  export interface ReqLoginForm {
    loginname: string;
    password: string;
    veritycode: string;
  }
  export interface ResLogin {
    role: number;
    token: string;
    id: number;
  }
  export interface ResAuthButtons {
    [key: string]: string[];
  }
}

// * 用户管理模块
export namespace User {
  export interface ReqUserParams extends ReqPage {
    id: number;
    username: string;
    nickname: string;
    email: string;
    createdAt: string;
  }
  export interface ReqUserParamId {
    id: number;
  }
  export interface ResUserList {
    id: string;
    username: string;
    nickname: string;
    email: string;
    createdAt: string;
    role: number;
    avatar: string;
    children?: ResUserList[];
  }
}

// * 分类管理模块
export namespace Category {
  export interface ReqCategoryParams extends ReqPage {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  }
  export interface ReqCategoryParamId {
    id: number;
  }
  export interface ResCategoryList {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    children?: ResCategoryList[];
  }
}

// * 标签管理模块
export namespace Tag {
  export interface ReqTagParams extends ReqPage {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  }
  export interface ReqTagParamId {
    id: number;
  }
  export interface ResTagList {
    id: string;
    name: string;
    tagColor: string;
    createdAt: string;
    updatedAt: string;
    children?: ResTagList[];
  }
}

// * 文章管理模块
export namespace Article {
  export interface ReqArticleParams extends ReqPage {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  }
  export interface ReqArticleParamId {
    id: number;
  }
  export interface TagsList {
    id: number;
    name: string;
  }
  export interface ResArticleList {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    tags?: TagsList[];
    children?: ResArticleList[];
  }
}

// * 评论管理模块
export namespace Comment {
  export interface ReqCommentParams extends ReqPage {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
  }
  export interface ReqCommentParamId {
    id: number;
  }
  export interface ResCommentList {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    children?: ResCommentList[];
  }
}
