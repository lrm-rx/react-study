import React, { Component } from "react";
import CreatePortal from "../CreatePortal";
import { CloseOutline } from "antd-mobile-icons";

const Styles = {
  modal: {
    position: "relative",
    top: "0",
    left: "0",
    zIndex: "999",
  },
  body: {
    backgroundColor: "#fff",
    position: "fixed",
    height: "100%",
    width: "100%",
    top: "0",
    left: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  close: {
    position: "absolute",
    top: "10px",
    right: "20px",
  },
};

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    //该方法内禁止访问this
    if (nextProps.show !== prevState.show) {
      //通过对比nextProps和prevState，返回一个用于更新状态(state)的对象
      return {
        showModal: nextProps.show,
      };
    }
    //不需要更新状态(state)，返回null
    return null;
  }

  handleClose = () => {
    const { onClose } = this.props;
    onClose && onClose();
  };
  render() {
    const { show, styleBody, styleClose, children } = this.props;
    const { showModal } = this.state;
    const _styleBody = {
      ...Styles.body,
      ...styleBody,
    };
    const _sytleClose = {
      ...Styles.close,
      ...styleClose,
    };
    return (
      <>
        {showModal ? (
          <CreatePortal style={Styles.modal}>
            <div style={_styleBody}>
              {children}
              <div style={_sytleClose}>
                <CloseOutline fontSize={24} onClick={this.handleClose} />
              </div>
            </div>
          </CreatePortal>
        ) : null}
      </>
    );
  }
}
