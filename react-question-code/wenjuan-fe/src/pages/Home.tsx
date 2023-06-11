import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'antd'

const Home: FC = () => {
  const nav = useNavigate()
  function clickHandler() {
    // nav('/login?b=30')
    nav({
      pathname: '/login',
      search: 'b=20',
    })
  }
  return (
    <div>
      <p>Home</p>
      <div>
        <button onClick={clickHandler}>登录</button>
        <Link to="/register">注册</Link>
        <Button type="primary">按钮</Button>
      </div>
    </div>
  )
}

export default Home
