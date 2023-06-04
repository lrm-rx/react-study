import React, { FC, useState } from 'react'
import QuestionCard from '../components/QuestionCard'
import styles from './List.module.scss'

const rawQuestionList = [
  {
    id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: false,
    answerCount: 6,
    createAt: '5月10日 14:25',
  },
  {
    id: 'q2',
    title: '问卷2',
    isPublished: true,
    isStar: true,
    answerCount: 999,
    createAt: '5月20日 13:14',
  },
  {
    id: 'q3',
    title: '问卷3',
    isPublished: false,
    isStar: false,
    answerCount: 15,
    createAt: '4月15日 15:25',
  },
  {
    id: 'q4',
    title: '问卷4',
    isPublished: true,
    isStar: true,
    answerCount: 88,
    createAt: '6月10日 17:23',
  },
]

const List: FC = () => {
  const [questionList, setQuestionList] = useState(rawQuestionList)

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div>列表</div>
      <div>footer</div>
    </>
  )
}

export default List
