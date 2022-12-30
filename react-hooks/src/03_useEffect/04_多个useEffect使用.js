import React, { useState, useEffect } from 'react'

export default function MultiuseEffectHook() {
  const [count, setCount] = useState(0)
  const [isLogin, setIsLogin] = useState(true)
  useEffect(() => {
    console.log("修改标题", count);
  }, [count, isLogin])

  useEffect(() => {
    console.log("订阅事件");
    return () => {
      console.log("取消事件订阅");
    }
  }, [])

  useEffect(() => {
    console.log("发送网络请求");
  }, [])


  return (
    <div>
      <h2>多个useEffect一起使用</h2>
      <h2>当前计数: {count}</h2>
      <button onClick={e => setCount(count + 1)}>+1</button>
      <h2>{isLogin ? "Ming" : "未登录"}</h2>
      <button onClick={e => setIsLogin(!isLogin)}>登录/注销</button>
    </div>
  )
}
