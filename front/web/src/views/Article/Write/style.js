import styled from "styled-components";

export const WriteArticleWraper = styled.div`
  .article-write-header {
    min-height: 60px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgba(0, 0, 0, 0.87);
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2),
      0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(15px) saturate(180%);
    -webkit-backdrop-filter: blur(15px) saturate(180%);
    border: 1px solid rgba(209, 213, 219, 0.4);
    .article-write-header-form {
      .write-article-form {
        .ant-form-item {
          padding: 10px 0;
        }
        .article-title-input {
          width: 400px;
        }
        .category-select {
          width: 120px;
        }
        .tag-select {
          width: 220px;
        }
      }
    }
  }
  .fix-article-header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    animation: fix-article-header 0.5s ease;
  }
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
  @keyframes fix-article-header {
    from {
      top: -400px;
    }
    to {
      top: 0px;
    }
  }
`;
