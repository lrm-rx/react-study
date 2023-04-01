import styled from "styled-components";

export const CommentWraper = styled.div`
  display: flex;
  justify-content: center;
  .comment-container {
    display: flex;
    flex-direction: column;
    margin: 40px;
  }
`;

export const CountWraper = styled.div`
  height: 40px;
  font-size: 18px;
`;

export const FormWraper = styled.div`
  margin: 10px 0;
  display: flex;
  .user-head {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
  .comment-send {
    margin-left: 36px;
    .textarea-container {
      display: flex;
      &:hover .ipt-txt {
        background-color: #fff;
        border-color: #00a1d6;
      }
      .ipt-txt {
        font-size: 12px;
        display: inline-block;
        box-sizing: border-box;
        background-color: #f4f5f7;
        border: 1px solid #e5e9ef;
        overflow: auto;
        border-radius: 4px;
        color: #555;
        width: 100% !important;
        height: 65px;
        transition: 0s;
        padding: 5px 10px;
        line-height: normal;
        resize: none;
        outline: none;
      }
      .comment-submit {
        width: 70px;
        height: 64px;
        padding: 4px 15px;
        margin-left: 10px;
        font-size: 14px;
        color: #fff;
        border-radius: 4px;
        text-align: center;
        min-width: 60px;
        cursor: pointer;
        background-color: #00a1d6;
        border: 1px solid #00a1d6;
        transition: 0.1s;
        user-select: none;
        outline: none;
        &:hover {
          background-color: #00b5e5;
          border-color: #00b5e5;
        }
      }
    }
  }
`;

export const ListWraper = styled.div`
  .comment-item {
    display: flex;
    .user-head {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
    .comment {
      flex: 1;
      margin-left: 35px;
      padding: 22px 0 14px 0;
      border-top: 1px solid #e5e9ef;
      .user {
        color: #6d757a;
        font-size: 12px;
        font-weight: bold;
        line-height: 18px;
        padding-bottom: 4px;
      }
      .text {
        line-height: 20px;
        padding: 2px 0;
        font-size: 14px;
      }
      .info {
        color: #99a2aa;
        line-height: 26px;
        font-size: 12px;
        .tiem {
          margin-right: 20px;
        }
        .btn-hover {
          padding: 0 5px;
          border-radius: 4px;
          cursor: pointer;
          &:hover {
            color: #00a1d6;
            background: #e5e9ef;
          }
        }
      }
    }
  }
`;
