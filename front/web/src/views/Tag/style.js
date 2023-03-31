import styled from "styled-components";

export const TagWraper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 0;
  height: 100vh;
  background: url(${(props) => props.tagBg}) no-repeat;
  background-size: cover;
  .tagcloud-all {
    .child-node {
      cursor: pointer;
    }
  }
`;
