import type { FC } from 'react'
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle'

// 统一,  各个组件的 prop type
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType

// 统一, 组件的配置
export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

// 全部组件配置的列表
const componentConfList: ComponentConfType[] = [QuestionInputConf, QuestionTitleConf]

export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type)
}
