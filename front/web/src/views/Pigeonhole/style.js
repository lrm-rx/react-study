import styled from "styled-components";

export const PigeonholeWraper = styled.div`
  padding: 60px 0;
  height: 100vh;
  position: relative;
  background: url(${(props) => props.pigeonholeBg}) no-repeat;
  background-size: cover;
  overflow: hidden;
  .pigeonhole-time-line {
    padding-top: 50px;
    width: 1100px;
    height: calc(100vh - 120px);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: scroll;
    .archives-navlink {
      color: #000;
    }
    .archives-navlink-div {
      color: #000;
      cursor: pointer;
    }
    .archives-no-data {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 20px;
      font-weight: 700;
    }
  }
`;
