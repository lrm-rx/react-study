import React, { FC, useState } from 'react'
import { useTitle } from 'ahooks'
import { Typography, Empty, Table, Tag, Space, Button, Modal, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'

const { Title } = Typography
const { confirm } = Modal

const rawQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: true,
    answerCount: 6,
    createdAt: '5月10日 14:25',
  },
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: true,
    isStar: false,
    answerCount: 999,
    createdAt: '5月20日 13:14',
  },
  {
    _id: 'q3',
    title: '问卷3',
    isPublished: false,
    isStar: true,
    answerCount: 15,
    createdAt: '4月15日 15:25',
  },
]

const tableColumns = [
  {
    title: '标题',
    dataIndex: 'title',
    // key: 'title', // 循环列的 key, 它会默认取dataIndex的值
  },
  {
    title: '是否发布',
    dataIndex: 'isPublished',
    render: (isPublished: boolean) => {
      return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
    },
  },
  {
    title: '答卷',
    dataIndex: 'answerCount',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
  },
]

const Trash: FC = () => {
  useTitle('小灰灰问卷 - 回收站')
  const [questionList, setQuestionList] = useState(rawQuestionList)

  const [selectIds, setSelectIds] = useState<string[]>([])

  function del() {
    confirm({
      title: '确定删除该问卷?',
      icon: <ExclamationCircleOutlined />,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        message.success('删除成功!')
      },
    })
  }

  const TableElem = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={selectIds.length ? false : true}>
            恢复
          </Button>
          <Button danger disabled={selectIds.length ? false : true} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={rawQuestionList}
        columns={tableColumns}
        pagination={false}
        rowKey={q => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`)
            setSelectIds(selectedRowKeys as string[])
          },
        }}
      />
    </>
  )
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  )
}

export default Trash
