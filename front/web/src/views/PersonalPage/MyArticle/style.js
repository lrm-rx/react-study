import styled from "styled-components";

export const MyArticleWraper = styled.div`
  .list-header {
    display: flex;
    .header-search {
      border-radius: 16px;
      width: 220px;
      margin-right: 10px;
    }
  }
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
`;
