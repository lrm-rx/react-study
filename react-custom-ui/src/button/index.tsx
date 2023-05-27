import React, { ReactNode } from 'react';
import classNames from 'classnames';

import './index.scss';

interface buttonProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
  type?: 'normal' | 'primary' | 'dashed' | 'link' | 'text';
  size?: 'small' | 'medium' | 'large';
  children?: ReactNode;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  htmlType?: "button" | "submit" | "reset";
  backgroundColor?: string;
}

const Button = React.forwardRef<HTMLButtonElement, buttonProps>((props: buttonProps, ref) => {
  const { className, type = 'normal', size = 'medium', children, style, backgroundColor, onClick, onBlur,
    htmlType = 'button',
    ...others } = props;

  const cls = classNames({
    'ant-btn': true,
    [`ant-btn-${size}`]: size,
    [`ant-btn-${type}`]: type,
    [className as string]: !!className,
  })
  const mergeStyle = {
    ...style,
    backgroundColor
  }
  return <button {...others}
    type={htmlType}
    ref={ref} className={cls} style={mergeStyle} onClick={onClick} onBlur={onBlur}>{children}</button>;
})

export default Button;