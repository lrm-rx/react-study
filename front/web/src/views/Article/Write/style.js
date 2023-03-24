import styled from "styled-components";

export const WriteArticleWraper = styled.div`
  padding: 60px 0;
  .article-write {
    width: 90%;
    min-height: calc(100% - 120px);
    margin: 20px auto;
    display: flex;
    border: 2px solid #ccc;
    border-radius: 6px;
    background-color: #fff;
    .article-write-md {
      width: 100%;
      min-height: calc(100vh - 164px);
    }
  }
`;
