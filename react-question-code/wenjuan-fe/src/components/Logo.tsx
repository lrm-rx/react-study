import React, { FC } from 'react'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { HOME_PATHNAME } from '../router'
import styles from './Logo.module.scss'

const { Title } = Typography

const Logo: FC = () => {
  return (
    <div className={styles.container}>
      <Link to={HOME_PATHNAME}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>小灰灰问卷</Title>
        </Space>
      </Link>
    </div>
  )
}

export default Logo
