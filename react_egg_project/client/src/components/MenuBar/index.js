import React, { PureComponent } from "react";
import { TabBar, SafeArea } from "antd-mobile";
import PropTypes from "prop-types";
import { AppOutline, TextOutline, UserOutline } from "antd-mobile-icons";
import { history } from "umi";

import "./index.less";

export class MenuBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          key: "/",
          title: "首页",
          icon: <AppOutline />,
        },
        {
          key: "/order",
          title: "订单",
          icon: <TextOutline />,
        },
        {
          key: "/user",
          title: "我的",
          icon: <UserOutline />,
        },
      ],
    };
  }
  render() {
    const { show, pathname } = this.props;

    return (
      <div className="menu-bar">
        {show && (
          <TabBar
            safeArea={true}
            activeKey={pathname}
            onChange={(value) => {
              history.push(value);
            }}
          >
            {this.state.items.map((item) => (
              <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
            ))}
          </TabBar>
        )}
      </div>
    );
  }
}

MenuBar.defaultProps = {
  show: false,
  pathname: "",
};

MenuBar.propTypes = {
  show: PropTypes.bool,
  pathname: PropTypes.string,
};

export default MenuBar;
