import React, { createContext, useState } from "react";
import CountCalss from "./01_体验hooks/01_count-class";
import CountHook from "./01_体验hooks/02_count-hook";
import MultiHookState from "./02_useState使用/01_多个状态的使用";
import ComplexHookState from './02_useState使用/02_复杂状态的修改';
import ClassTitleChange from "./03_useEffect/01_class实现title的修改";
import MultiuseEffectHook from "./03_useEffect/04_多个useEffect使用";
import HookTitleChange from "./03_useEffect/02_hook实现title的修改";
import EffectHookCancelDemo from "./03_useEffect/03_useEffect模拟事件订阅和取消事件订阅";
import UseContextHook from "./04_useContext使用/useContext";
import Home from "./05_useReducer使用/home"
import Profile from "./05_useReducer使用/profile";
import CallbackHookDemo01 from "./06_useCallBack使用/01_useCallback不能进行的性能优化";
import CallbackHookDemo02 from "./06_useCallBack使用/02_useCallback进行的性能优化";

// url: "https://ku.qingnian8.com/dataApi/news/newslist.php"
export const UserContext = createContext();
export const ThemeContext = createContext();

export default function App() {
  const [isShow, setIsShow] = useState(true)
  return (
    <div className="App">
      {/* 1. Hook初体验 */}
      {/* <CountCalss />
      <hr/>
      <CountHook /> */}

      {/* 2.useState */}
      {/* <MultiHookState/> */}
      {/* <ComplexHookState/> */}

      {/* 3.useEffect */}
      {/* <ClassTitleChange/> */}
      {/* <HookTitleChange/> */}

      {/* {isShow && <EffectHookCancelDemo />}
      <button onClick={e => setIsShow(!isShow)}>EffectHookCancelDeom</button> */}

      {/* {isShow && <MultiuseEffectHook/>}
      <button onClick={e => setIsShow(!isShow)}>EffectHookCancelDeom</button> */}

      {/* 4. useContext的使用 */}
      {/* <UserContext.Provider value={{name: "ming", age: 18}}>
        <ThemeContext.Provider value={{color: "pink"}}>
          <UseContextHook />
        </ThemeContext.Provider>
      </UserContext.Provider> */}

      {/* 5.useReducer的使用 */}
      {/* <Home/>
      <Profile/> */}

      {/* 6. useCallback的使用 */}
      {/* <CallbackHookDemo01/> */}
      <CallbackHookDemo02/>
    </div>
  );
}

