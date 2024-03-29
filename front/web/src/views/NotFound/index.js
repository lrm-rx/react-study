import { Link } from "react-router-dom";
import { Button } from "antd";
import img404 from "../../assets/images/404.png";
import { NotFoundWraper } from "./style";
import { useTitle } from "@hooks";

export default function NotFound() {
  useTitle("博客-404");
  return (
    <NotFoundWraper>
      <div className="status-wrapper-content">
        <img src={img404} alt="404" />
        <p>没有找到</p>
        <Link to="/">
          <Button type="primary">回到首页</Button>
        </Link>
      </div>
    </NotFoundWraper>
  );
}
