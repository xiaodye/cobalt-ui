import clsx from 'clsx';
import { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import './style.scss';
// import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = {
  /**
   * @description 自定义样式
   */
  style?: CSSProperties;
  /**
   * @description 按钮类名
   */
  className?: string;
  /**
   * @description 按钮失效状态
   * @default false
   */
  disabled?: boolean;
  /**
   * @description 设置按钮大小
   * @default 'middle'
   */
  size?: 'large' | 'middle' | 'small';
  /**
   * @description 设置按钮类型
   * @default 'default'
   */
  /**设置 Button 的类型 */
  type?: 'primary' | 'default' | 'danger' | 'link' | 'warning' | 'info' | 'dashed';
  /**
   * @description 按钮内容
   */
  children?: ReactNode;
  /**
   * @description 点击跳转的地址
   */
  href?: string;
  /**
   * @description 设置按钮形状为圆形
   * @default false
   */
  circle?: boolean;
  /**
   * @description 点击事件
   * @returns
   */
  onClick?: MouseEventHandler<HTMLElement>;
};

// type NativeButtonProps = BaseButtonProps & Omit<ButtonHTMLAttributes<HTMLElement>, 'type'>;
// type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
// type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: React.FC<ButtonProps> = ({
  type = 'default',
  size = 'middle',
  disabled = false,
  children,
  href,
  circle,
  className,
  style,
  onClick,
  ...restProps
}) => {
  const classes = clsx('btn', className, {
    [`btn-${type}`]: type,
    [`btn-${size}`]: size,
    disabled: type === 'link' && disabled,
    circle: type !== 'link' && circle,
  });

  if (type === 'link' && href) {
    return (
      <a className={classes} href={href} {...restProps} style={style} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} disabled={disabled} onClick={onClick} {...restProps} style={style}>
      {children}
    </button>
  );
};

export default Button;
export type { ButtonProps };
