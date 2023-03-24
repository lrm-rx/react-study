import styled from "styled-components";

export const ArticleDetailWraper = styled.div`
  .article-detail {
    width: 90%;
    min-height: calc(100% - 120px);
    margin: 20px auto;
    display: flex;
    border: 2px solid #ccc;
    border-radius: 6px;
    background-color: #fff;
    .article-nav {
      flex: 1;
      border-right: 4px solid #ccc;
      .article-mark-nav {
        width: calc(${(props) => props.navWidth}px - 4px);
        position: fixed;
        top: 70px;
        left: ${(props) => props.navOffsetLet};
        z-index: 100;
        animation: navAnimation 0.5s ease;
      }
    }
    .article-main-content {
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
