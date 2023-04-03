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
  .item-content-area {
    margin-top: 10px;
    height: calc(100vh - 270px);
    overflow-y: scroll;
  }
`;
