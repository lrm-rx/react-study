import { useState, useEffect, memo } from "react";
import { Timeline, message } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { PigeonholeWraper } from "./style";
import pigeonholeBgImg from "@assets/images/bg2.jpg";
import { snowAnimate } from "@utils/createAnimate";
import { getArchives } from "@service/article";

const Pigeonhole = memo(() => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  useEffect(() => {
    snowAnimate("#snow-canvas");
  }, []);
  useEffect(() => {
    (async () => {
      const result = await getArchives();
      if (Number(result.code) !== 200) {
        message.error({
          content: result.msg,
          duration: 1,
        });
        return;
      }
      const list = result?.data || [];
      setItems(list);
    })();
  }, []);

  // const clickTimeLine = (e) => {
  //   // 这里使用到了事件委托
  //   const aid = e.target.getAttribute("data-article-id");
  //   console.log("aid:", aid);
  //   if (!aid) return;
  //   navigate(`/article/detail/${aid}`);
  // };

  return (
    <PigeonholeWraper pigeonholeBg={pigeonholeBgImg}>
      <canvas id="snow-canvas"></canvas>
      <div className="pigeonhole-time-line">
        {items.length > 0 ? (
          <Timeline
            mode="alternate"
            items={items.map((item) => {
              return {
                label: (
                  <NavLink
                    data-article-id={item.id}
                    className="archives-navlink"
                    key={item.id}
                    to={`/article/detail/${item.id}`}
                  >
                    {item.createdAt}
                  </NavLink>
                ),
                children: (
                  <NavLink
                    data-article-id={item.id}
                    className="archives-navlink-div"
                    key={item.id}
                    to={`/article/detail/${item.id}`}
                  >
                    {item.title}
                  </NavLink>
                ),
              };
            })}
          />
        ) : (
          <div className="archives-no-data">暂无归档数据!</div>
        )}
      </div>
    </PigeonholeWraper>
  );
});

export default Pigeonhole;
