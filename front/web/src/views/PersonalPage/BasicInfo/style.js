import styled from "styled-components";

export const BasicInfoWraper = styled.div`
  margin-left: 80px;
  .basic-info-row {
    margin-top: 20px;
    .update-nickname-col {
      display: flex;
      .nickname-input {
        width: 220px;
      }
      .edit-update-nickname {
        margin-left: 20px;
        display: inline-block;
        width: 40px;
        height: 30px;
        border: 1px solid #528bff;
        border-radius: 6px;
        line-height: 30px;
        text-align: center;
        color: #528bff;
        cursor: pointer;
        &:hover {
          color: #fff;
          background-color: #528bff;
        }
      }
      .cancel-update {
        margin-left: 10px;
      }
    }
  }
`;
