import { useState, useEffect, useCallback, memo } from "react";
import EasyTyper from "easy-typer-js";
import { HomeWraper } from "./style";
import bgImg from "@assets/images/sakura.jpg";
import petal from "@assets/images/petal.png";
import { petalAnimate } from "@utils/createAnimate";
import { EASY_TYPER_URL } from "@common/contants";

const Home = memo(() => {
  // 配置对象
  const obj = {
    output: "",
    isEnd: false,
    speed: 100,
    singleBack: false,
    sleep: 0,
    type: "normal",
    backSpeed: 40,
    sentencePause: false,
  };
  const [output, setOutput] = useState("");
  let typer = null;
  const initTyper = (input) => {
    typer?.close();
    typer = null;
    // 实例化
    typer = new EasyTyper(
      obj,
      input,
      () => {
        /*输出完毕后的回调函数*/
      },
      (output) => {
        setOutput((prevState) => output);
      }
    );
  };
  const changeSentence = () => {
    fetch(EASY_TYPER_URL)
      .then((res) => res.json())
      .then((result) => {
        let content;
        if (result.code === 200) {
          content = `${result.data.content} —— ${result.data.name}`;
        } else {
          content = "时光啊就像潮水它送来了一切也会带走一切 —— 暮光星灵·佐伊";
        }
        initTyper(content);
      });
  };
  useEffect(() => {
    changeSentence();
  }, []);

  // useEffect(() => {
  //   initTyper();
  //   return () => {
  //     typer.close();
  //   };
  // }, []);

  useEffect(() => {
    petalAnimate("canvas", petal);
  }, []);

  return (
    <HomeWraper bgUrl={bgImg}>
      <canvas></canvas>
      <div className="note" onClick={changeSentence}>
        {output}
        <span className="easy-typed-cursor">|</span>
      </div>
    </HomeWraper>
  );
});

export default Home;
