import { Link } from "react-router-dom";
import { Button } from "antd";
import img401 from "../../assets/images/401.png";
import { NotFoundWraper } from "./style";
import { useTitle } from "@hooks";

export default function NoAuth() {
  useTitle("博客-401");
  return (
    <NotFoundWraper>
      <div className="status-wrapper-content">
        <img src={img401} alt="401" />
        <p>没有权限</p>
        <Link to="/">
          <Button type="primary">回到首页</Button>
        </Link>
      </div>
    </NotFoundWraper>
  );
}
