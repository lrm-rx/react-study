import styled from "styled-components";

export const ArticleWraper = styled.div`
  padding: 20px 0;
  .article-area {
    min-height: calc(100vh - 216px);
    padding-left: 10px;
    border: 2px solid #ccc;
    border-radius: 10px;
    display: flex;
    .article-left {
      width: 66%;
      .list-no-data {
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        .content-tip {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #ccc;
          .no-data-icon {
            font-size: 36px;
          }
          span {
            font-size: 14px;
          }
        }
      }
    }
    .article-right {
      padding: 20px 10px;
      width: 33%;
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
