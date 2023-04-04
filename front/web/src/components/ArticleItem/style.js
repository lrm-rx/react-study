import styled from "styled-components";

export const ArticleItemWraper = styled.div`
  &:first-child {
    margin-top: 0;
  }
  margin-top: 20px;
  .article-card {
    display: flex;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2),
      0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
    /* height: 220px; */
    .left {
      cursor: pointer;
      img {
        width: 120px;
        height: 120px;
      }
    }
    .right {
      height: 120px;
      max-width: 462px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding-left: 30px;
      .title {
        cursor: pointer;
        font-size: 22px;
        font-weight: 700;
      }
      .sort-content {
        cursor: pointer;
        font-size: 18px;
        font-weight: 600;
      }
      ul {
        display: flex;
        font-size: 14px;
        .watch-count {
          cursor: pointer;
          color: #2196f3;
        }
        .common-cout {
          cursor: pointer;
          color: #00e676;
        }
        .category {
          color: #00e676;
        }
        .tags {
          color: #2196f3;
        }
        li {
          margin-right: 30px;
          .article-tag {
            margin-right: 6px;
          }
        }
      }
    }
  }
`;
