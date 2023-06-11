import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Typography } from 'antd'
import styles from './Home.module.scss'
import { MANAGE_INDEX_PATHNAME } from '../router/index'

const { Title, Paragraph } = Typography

const Home: FC = () => {
  const nav = useNavigate()
  // function clickHandler() {
  //   // nav('/login?b=30')
  //   nav({
  //     pathname: '/login',
  //     search: 'b=20',
  //   })
  // }
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>已累计创建问卷 100 份, 发布问卷 90 份, 收到答卷 999份 </Paragraph>
        <div>
          <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
