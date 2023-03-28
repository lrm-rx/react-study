import styled from "styled-components";

export const PersonalPageWraper = styled.div`
  padding: 60px 0;
  height: 100vh;
  /* background: url(${(props) => props.aboutBg}) no-repeat;
  background-size: cover; */
  .personal-home-page {
    margin: 10px auto;
    padding: 20px;
    height: calc(100vh - 140px);
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 6px 6px 10px #ccc;
  }
`;
