import React, { FC, useEffect, useState } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import styles from './index.module.scss'

const Edit: FC = () => {
  const { loading, data } = useLoadQuestionData()

  return (
    <div className={styles.container}>
      <div style={{ backgroundColor: '#fff' }}>Header</div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>left</div>
          <div className={styles.main}>
            <div className={styles['canvas-wrapper']}></div>
          </div>
          <div className={styles.right}>right</div>
        </div>
      </div>
    </div>
  )
}

export default Edit
