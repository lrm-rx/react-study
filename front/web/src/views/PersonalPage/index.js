import { useState, useEffect, memo } from "react";
import { Tabs } from "antd";
import MyArticle from "./MyArticle";
import BasicInfo from "./BasicInfo";
import { PersonalPageWraper } from "./style";

const PersonalPage = memo(() => {
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <PersonalPageWraper>
      <div className="wrap-v1 personal-home-page">
        <Tabs
          defaultActiveKey="2"
          items={[
            {
              key: "1",
              label: `我的文章`,
              children: <MyArticle />,
            },
            {
              key: "2",
              label: `基本信息`,
              children: <BasicInfo />,
            },
          ]}
          onChange={onChange}
        />
      </div>
    </PersonalPageWraper>
  );
});

export default PersonalPage;
