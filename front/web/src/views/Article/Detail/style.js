import styled from "styled-components";

export const ArticleDetailWraper = styled.div`
  .article-detail {
    width: 90%;
    margin: 20px auto;
    display: flex;
    border: 2px solid #ccc;
    border-radius: 6px;
    background-color: #fff;
    .article-nav {
      flex: 1;
      border-right: 4px solid #ccc;
    }
    .article-main-content {
      padding: 10px;
      flex: 3;
    }
  }
`;
