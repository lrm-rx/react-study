import styled from "styled-components";

export const ArticleWraper = styled.div`
  padding: 20px 0;
  .article-area {
    min-height: calc(100vh - 160px);
    padding-left: 10px;
    border: 2px solid #ccc;
    border-radius: 10px;
    display: flex;
    .article-left {
      flex: 2;
    }
    .article-right {
      padding: 20px 10px;
      flex: 1;
      .current-date-time {
        margin: 10px 0;
        font-size: 14px;
      }
    }
  }
  .article-area-paging {
    padding-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
`;
