import React, { FC } from 'react'
import { Spin } from 'antd'
import styles from './EditCanvas.module.scss'

// 临时
import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Component'
import QuestionInput from '../../../components/QuestionComponents/QuestionInput/Component'

type PropsType = {
  loading: boolean
}
const EditCanvas: FC<PropsType> = ({ loading }) => {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Spin />
      </div>
    )
  }
  return (
    <div className={styles.canvas}>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionTitle />
        </div>
      </div>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionInput />
        </div>
      </div>
    </div>
  )
}

export default EditCanvas
