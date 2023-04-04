import styled from "styled-components";

export const NotFoundWraper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  overflow: hidden;
  .status-wrapper-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      margin: 30px 0;
    }
  }
`;
