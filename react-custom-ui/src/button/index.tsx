import React from 'react'
import classNames from 'classnames'
import './index.scss'

const Button = (props: any) => {
  const { className, type = 'normal', size = 'medium', children, style, onClick, onBlur, htmlType = 'button', ...others } = props;

  const cls = classNames({
    'ant-btn': true,
    [`ant-btn-${size}`]: size,
    [`ant-btn-${type}`]: type,
    [className as string]: !!className
  })
  return <button {...others} type={htmlType} className={cls} style={style} onClick={onClick} onBlur={onBlur}>{children}</button>
}

export default Button;