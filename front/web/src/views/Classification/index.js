import { useState, useEffect, memo } from "react";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories, getCategoryBelowArticle } from "@service/category";
import {
  inputValChange,
  openModal,
  setContentList,
} from "@store/modules/globalSlice";
import { CategoryWraper } from "./style";
import categoryBgImg from "@assets/images/bg4.jpg";
import c5 from "@assets/images/c5.jpg";

const Category = memo(() => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const categoriesList = useSelector((state) => state.categoryInfo.list);
  useEffect(() => {
    const sliceList = categoriesList.slice(0, 4);
    setCategories(sliceList);
  }, [categoriesList]);

  const clickCard = (id, name) => {
    return async () => {
      const result = await getCategoryBelowArticle([id]);
      if (Number(result.code) === 200) {
        let list = result.data[0]?.articles || [];
        const count = result.data[0]?.articleCount || 0;
        const content = `${name}(${count})`;
        await dispatch(inputValChange(content));
        await dispatch(
          openModal({
            isSearchInput: false,
            open: true,
          })
        );
        dispatch(setContentList(list));
        return;
      }
      message.error({
        content: result.msg || "出错啦!",
        duration: 1,
      });
    };
  };

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
              onClick={clickCard(item.id, item.name)}
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
