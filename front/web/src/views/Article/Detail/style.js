import styled from "styled-components";

export const ArticleDetailWraper = styled.div`
  .article-title {
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 36px;
  }
  .article-info {
    font-weight: 700;
    .article-info-tag {
      margin-right: 6px;
    }
  }
  .article-detail {
    width: 90%;
    min-height: calc(100vh - 242px);
    background-color: pink;
    margin: 20px auto;
    display: flex;
    border: 2px solid #ccc;
    border-radius: 6px;
    background-color: #fff;
    .article-nav {
      max-height: 100vh;
      flex: 1;
      border-right: 4px solid #ccc;
    }
    .article-main-content {
      max-height: 100vh;
      padding: 10px;
      flex: 3;
    }
    @keyframes navAnimation {
      0% {
        top: 0;
      }
      100% {
        top: 70;
      }
    }
  }
`;
