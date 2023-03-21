import styled from "styled-components";

export const LayoutWraper = styled.div`
  .layout-header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
  }
  .main-content-area {
    min-height: calc(100vh - 120px);
  }
  .layout-footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99;
  }
`;
