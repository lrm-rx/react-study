import { memo, useEffect } from "react";
import useTypewriter from "react-typewriter-hook";
import { HomeWraper } from "./style";
import bgImg from "@assets/images/sakura.jpg";
import petal from "@assets/images/petal.png";
import { petalAnimate } from "@utils/createAnimate";

const Home = memo(() => {
  const talk = useTypewriter(
    "因为在乎，所以难以接受，因为爱，所以泪雨婆娑，因为原谅，所以一切可以继续。"
  );
  useEffect(() => {
    petalAnimate("canvas", petal);
  }, []);

  return (
    <HomeWraper bgUrl={bgImg}>
      <canvas></canvas>
      <div className="note">{talk}</div>
    </HomeWraper>
  );
});

export default Home;
