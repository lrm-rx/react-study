import styled from "styled-components";

export const MyAritcleItemWraper = styled.div`
  display: flex;
  padding: 20px;
  position: relative;
  margin-top: 10px;
  margin-right: 6px;
  margin-left: 6px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);

  .left {
    display: flex;
    align-items: center;
    .checkbox-input {
      cursor: pointer;
      margin-right: 20px;
      width: 20px;
      height: 20px;
    }
    img {
      cursor: pointer;
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
    cursor: pointer;
    .title {
      font-size: 22px;
      font-weight: 700;
    }
    .sort-content {
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
  .article-operation {
    position: absolute;
    top: 50%;
    right: 30px;
    transform: translateY(-50%);
    .edit-icon,
    .delete-icon {
      font-size: 30px;
      &:hover {
        cursor: pointer;
        color: #528bff;
      }
    }
  }
`;
