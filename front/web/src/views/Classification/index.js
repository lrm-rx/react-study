import { memo } from "react";
import { CategoryWraper } from "./style";
import categoryBgImg from "@assets/images/bg4.jpg";
import c1 from "@assets/images/c1.jpg";
import c2 from "@assets/images/c2.jpg";
import c3 from "@assets/images/c3.jpg";
import c4 from "@assets/images/c4.jpg";

const Category = memo(() => {
  return (
    <CategoryWraper categoryBg={categoryBgImg}>
      <div className="category-carts">
        <div
          className="c-item"
          style={{
            background: `url(${c1}) no-repeat center center`,
          }}
        >
          111
        </div>
        <div
          className="c-item"
          style={{
            background: `url(${c2}) no-repeat center center`,
          }}
        >
          111
        </div>
        <div
          className="c-item"
          style={{
            background: `url(${c3}) no-repeat center center`,
          }}
        >
          111
        </div>
        <div
          className="c-item"
          style={{
            background: `url(${c4}) no-repeat center center`,
          }}
        >
          111
        </div>
      </div>
    </CategoryWraper>
  );
});

export default Category;
