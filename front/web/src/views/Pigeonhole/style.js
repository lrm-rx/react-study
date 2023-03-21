import styled from "styled-components";

export const PigeonholeWraper = styled.div`
  padding: 60px 0;
  height: 100vh;
  background: url(${(props) => props.pigeonholeBg}) no-repeat;
  background-size: cover;
  .pigeonhole-time-line {
    padding: 20px 0;
    margin: 0 auto;
  }
`;
