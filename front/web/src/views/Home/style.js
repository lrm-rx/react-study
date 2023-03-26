import styled from "styled-components";

export const HomeWraper = styled.div`
  padding: 60px 0;
  overflow: hidden;
  height: 100vh;
  background: url(${(props) => props.bgUrl});
  background-size: cover;
  .note {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 500px;
    padding: 20px;
    font-size: 18px;
    /* 拟物玻璃化效果 */
    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(15px) saturate(180%);
    border-radius: 10px;
    border: 1px solid rgba(209, 213, 219, 0.4);
    color: #000;
    cursor: pointer;
    .easy-typed-cursor {
      margin-left: 6px;
      opacity: 1;
      -webkit-animation: blink 0.7s infinite;
      -moz-animation: blink 0.7s infinite;
      animation: blink 0.7s infinite;
    }
    @keyframes blink {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    @-webkit-keyframes blink {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    @-moz-keyframes blink {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }

  /* 去除滚动条 */
  .overlay::-webkit-scrollbar {
    width: 0;
  }
`;
