import styled from "styled-components";

export const AboutWraper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 0;
  height: 100vh;
  background: url(${(props) => props.aboutBg}) no-repeat;
  background-size: cover;
  .about {
    min-width: 200px;
    padding: 20px;
    /* 拟物玻璃化效果 */
    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(15px) saturate(180%);
    border-radius: 10px;
    border: 1px solid rgba(209, 213, 219, 0.4);
    color: #000;
    .title {
      text-align: center;
    }
    .content {
      padding-top: 20px;
      font-size: 16px;
    }
  }
`;
