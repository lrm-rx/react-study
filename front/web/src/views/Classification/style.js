import styled from "styled-components";

export const CategoryWraper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 0;
  height: 100vh;
  background: url(${(props) => props.categoryBg}) no-repeat;
  background-size: cover;
  .category-carts {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .c-item {
      margin: 10px 20px;
      min-width: 300px;
      height: 200px;
      overflow: hidden;
      transition: all 0.5s;
      /* 拟物玻璃化效果 */
      background-color: rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(15px) saturate(180%);
      border-radius: 10px;
      border: 1px solid rgba(209, 213, 219, 0.4);
      &:hover {
        box-shadow: 0 8px 8px 0 grey; // 设置盒子阴影
        transform: translate(0, -10px); // 鼠标悬浮时box向上浮动的距离
        /* transform: scale(1.1); */
      }
    }
  }
`;
