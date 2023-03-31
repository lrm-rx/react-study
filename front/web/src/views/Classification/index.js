import { useState, useEffect, memo } from "react";
import { message } from "antd";
import { getAllCategories } from "@service/category";
import { CategoryWraper } from "./style";
import categoryBgImg from "@assets/images/bg4.jpg";
import c5 from "@assets/images/c5.jpg";

const Category = memo(() => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await getAllCategories();
      if (Number(result.code) !== 200) {
        message.error({
          content: result.msg,
          duration: 1,
        });
        return;
      }
      const originalList = result.data || [];
      const sliceList = originalList.slice(0, 4);
      setCategories(sliceList);
    })();
  }, []);

  return (
    <CategoryWraper categoryBg={categoryBgImg}>
      <div className="category-carts">
        {categories.length > 0 ? (
          categories.map((item) => (
            <div
              key={item.id}
              className="c-item"
              style={{
                background: `url(${c5}) no-repeat center center`,
              }}
            >
              {item.name}
            </div>
          ))
        ) : (
          <div className="category-no-data">暂无分类数据!</div>
        )}
      </div>
    </CategoryWraper>
  );
});

export default Category;
