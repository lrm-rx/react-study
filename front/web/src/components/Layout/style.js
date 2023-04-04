import styled from "styled-components";

export const LayoutWraper = styled.div`
  .layout-header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
  }
  .fix-header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    animation: fixanimation 0.5s ease;
  }
  @keyframes fixanimation {
    0% {
      top: -120px;
    }
    100% {
      top: 0;
    }
  }
  .main-content-area {
    min-height: calc(100vh - 120px);
  }
  @keyframes fixanimationTop {
    0% {
      margin-top: 0;
    }
    100% {
      margin-top: 60px;
    }
  }

  .fix-header-top {
    margin-top: 60px;
    animation: fixanimationTop 0.5s ease;
  }
  .layout-footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99;
  }
`;
