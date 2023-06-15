import React, { FC, useState } from 'react'
import { Typography, Empty } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { useTitle } from 'ahooks'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'

const { Title } = Typography
const rawQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: false,
    answerCount: 6,
    createdAt: '5月10日 14:25',
  },
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: true,
    isStar: true,
    answerCount: 999,
    createdAt: '5月20日 13:14',
  },
  {
    _id: 'q3',
    title: '问卷3',
    isPublished: false,
    isStar: false,
    answerCount: 15,
    createdAt: '4月15日 15:25',
  },
  {
    _id: 'q4',
    title: '问卷4',
    isPublished: true,
    isStar: true,
    answerCount: 88,
    createdAt: '6月10日 17:23',
  },
]

const List: FC = () => {
  useTitle('小灰灰问卷-我的问卷')
  // const [searchParams] = useSearchParams()
  // console.log('keyword:', searchParams.get('keyword'))
  const [questionList, setQuestionList] = useState(rawQuestionList)

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {/* 问卷列表 */}
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 &&
          questionList.map(q => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>加载更多</div>
    </>
  )
}

export default List
