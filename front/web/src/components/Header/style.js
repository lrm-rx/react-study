import styled from "styled-components";

export const HeaderWraper = styled.div`
  height: 60px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(0, 0, 0, 0.87);
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12);
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(15px) saturate(180%);
  -webkit-backdrop-filter: blur(15px) saturate(180%);
  border: 1px solid rgba(209, 213, 219, 0.4);

  .logo {
    display: flex;
    align-items: center;
    margin-left: 20px;
    font-size: 18px;
    font-weight: 700;
    &:hover {
      cursor: pointer;
    }

    img {
      width: 30px;
      height: 30px;
    }
  }
  .header-right {
    display: flex;
    font-size: 14px;

    .global-search {
      margin-right: 10px;
      line-height: 60px;
      font-size: 20px;
      .search-icon {
        cursor: pointer;
      }
    }

    a {
      display: inline-block;
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }

    .active-link {
      border-bottom: 4px solid #1a73e8;
    }

    .nav-options {
      height: 60px;
      margin-left: 10px;
      display: flex;
      align-items: center;
      .save-publish-btn,
      .login,
      .register {
        width: 50px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #1a73e8;
        border-radius: 6px;
        cursor: pointer;
        color: #1a73e8;
        &:hover {
          background-color: #1a73e8;
          color: #fff;
        }
      }
      .save-publish-btn,
      .writing-btn {
        margin-right: 6px;
      }
      .save-publish-btn {
        width: 90px;
      }
      .cross-line {
        width: 1px;
        height: 26px;
        border: 1px solid #666666;
        margin: 0 6px;
      }
    }
  }
`;
