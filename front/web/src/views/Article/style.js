import styled from "styled-components";

export const ArticleWraper = styled.div`
  padding: 60px 0;
  height: 100vh;
  background: url(${(props) => props.articleBg}) no-repeat;
  background-size: cover;
`;
