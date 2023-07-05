// 问卷 标题

import Component from './Component'
import { QuestionTitleDefaultProps } from './interface'

export * from './interface'

// 组件的配置
export default {
  title: '标题',
  type: 'questionTitle', // 要和后端统一好
  Component,
  defaultProps: QuestionTitleDefaultProps,
}
