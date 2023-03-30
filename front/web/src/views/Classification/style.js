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
      display: flex;
      justify-content: center;
      align-items: center;
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
      font-size: 36px;
      color: #fff;
      text-shadow: -1px -1px rgba(197, 223, 248, 0.8),
        -2px -2px rgba(197, 223, 248, 0.8), -3px -3px rgba(197, 223, 248, 0.8);
      &:hover {
        box-shadow: 0 8px 8px 0 grey; // 设置盒子阴影
        transform: translate(0, -10px); // 鼠标悬浮时box向上浮动的距离
        /* transform: scale(1.1); */
      }
    }
  }

  /* 3D文字 */
  /* .demo {
    background: #666666;
    width: 100%;
    box-sizing: border-box;
    padding: 30px;
    font: bold 55px/100% "微软雅黑", "Lucida Grande", "Lucida Sans", Helvetica,
      Arial, Sans;
    color: #fff;
    text-align: center;
    text-transform: uppercase;
  }
  .demo1 {
    color: #fff;
    text-shadow: 1px 1px rgba(197, 223, 248, 0.8),
      2px 2px rgba(197, 223, 248, 0.8), 3px 3px rgba(197, 223, 248, 0.8),
      4px 4px rgba(197, 223, 248, 0.8), 5px 5px rgba(197, 223, 248, 0.8),
      6px 6px rgba(197, 223, 248, 0.8);
  }
  .demo2 {
    color: #fff;
    text-shadow: -1px -1px rgba(197, 223, 248, 0.8),
      -2px -2px rgba(197, 223, 248, 0.8), -3px -3px rgba(197, 223, 248, 0.8),
      -4px -4px rgba(197, 223, 248, 0.8), -5px -5px rgba(197, 223, 248, 0.8),
      -6px -6px rgba(197, 223, 248, 0.8);
  }
  .demo3 {
    color: #eee;
    text-shadow: 5px 5px 0 #666, 7px 7px 0 #eee;
  }
  .demo4 {
    color: rgba(255, 179, 140, 0.5);
    text-shadow: 3px 3px 0 rgba(180, 255, 0, 0.5);
  } */
`;
