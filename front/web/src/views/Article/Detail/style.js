import styled from "styled-components";

export const ArticleDetailWraper = styled.div`
  .comment-icon-fix {
    position: fixed;
    right: 20px;
    top: 160px;
    .comment-icon {
      font-size: 36px;
      &:hover {
        cursor: pointer;
        color: #528bff;
      }
    }
  }
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
      min-height: 100vh;
      flex: 1;
      border-right: 4px solid #ccc;
    }
    .article-main-content {
      min-height: 100vh;
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
  .up-and-down-pages {
    display: flex;
    justify-content: center;
    .pages-ul {
      width: 740px;
      display: flex;
      flex-direction: column;
      font-size: 14px;
      li {
        margin: 6px 0;
        &:hover {
          color: #528bff;
        }
      }
      .pages-nav:hover {
        color: #528bff;
      }
    }
  }
`;
