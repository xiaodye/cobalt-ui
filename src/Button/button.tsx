import classNames from 'classnames';
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode, useContext, useMemo } from 'react';
import { globalCtx } from '../GlobalConfig';
import { GlobalConfigProps } from '../GlobalConfig/interface';

type BaseButtonProps = {
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
   * @description 点击跳转的地址，指定此属性 button 的行为和 a 链接一致
   */
  href?: string;
  /**
   * @description 设置按钮形状为圆形
   * @default false
   */
  circle?: boolean;
};

type NativeButtonProps = BaseButtonProps & Omit<ButtonHTMLAttributes<HTMLElement>, 'type'>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: React.FC<ButtonProps> = ({
  type = 'default',
  size = 'middle',
  disabled = false,
  children,
  href,
  circle,
  className,
  style,
  ...restProps
}) => {
  const { globalColor } = useContext(globalCtx) as GlobalConfigProps;

  const buttonStyle = useMemo(() => {
    if (type === 'link') {
      return {
        color: globalColor,
      };
    }
    return {
      backgroundColor: globalColor,
      borderColor: globalColor,
    };
  }, [globalColor]);

  const classes = classNames('btn', className, {
    [`btn-${type}`]: type,
    [`btn-${size}`]: size,
    disabled: type === 'link' && disabled,
    circle: type !== 'link' && circle,
  });

  if (type === 'link' && href) {
    return (
      <a className={classes} href={href} {...restProps} style={{ ...buttonStyle, ...style }}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} disabled={disabled} {...restProps} style={{ ...buttonStyle, ...style }}>
      {children}
    </button>
  );
};

export default Button;
export { ButtonProps };