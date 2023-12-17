import classNames from 'classnames';
import { CSSProperties, FC, ReactNode, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './style.scss';
import TooltipEl from './tooltipItem';
import type { TooltipAlign } from './types';

const el = document.createElement('div');
el.className = 'mzl_position-container';
if (!document.querySelector('.mzl_position-container')) {
  document.body.appendChild(el);
}

type TooltipProps = {
  style?: CSSProperties;
  className?: string;
  children: ReactNode;
  content: ReactNode;
  align?: TooltipAlign;
  color?: string;
  onOpenChange?: (flag: boolean) => void;
  zIndex?: number;
};

const Tooltip: FC<TooltipProps> = ({
  style,
  className,
  children,
  content,
  align = 'top',
  color = '#000',
  zIndex = 1011,
  onOpenChange,
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<any>(null);
  const Ele = document.createElement('div');
  Ele.className = 'mzl_position';
  const containerEl = Ele as HTMLElement;
  const root = ReactDOM.createRoot(containerEl);

  const classes = classNames('mzl_tooltip', className);

  const tooltipMouseOver = (): void => {
    const viewportOffset = tooltipRef.current?.getBoundingClientRect();
    const left = viewportOffset?.left || 0;
    const top = viewportOffset?.top || 0;
    const width = tooltipRef.current?.clientWidth;
    const height = tooltipRef.current?.clientHeight;
    root.render(
      <TooltipEl
        left={left as number}
        top={top as number}
        width={width as number}
        height={height as number}
        content={content}
        align={align}
        cRef={childrenRef}
        color={color}
        zIndex={zIndex}
      />,
    );
    // 置入到指定节点下
    const container = document.querySelector('.mzl_position-container');
    if (container) {
      container.appendChild(Ele);
    }
    let timer: any = null;
    clearTimeout(timer);
    timer = setTimeout(() => {
      (childrenRef.current as any).handleOpen(true);
      onOpenChange?.(true);
    }, 150);
  };

  const tooltipMouseOut = (): void => {
    (childrenRef.current as any).handleOpen(false);
    let timer: any = null;
    if (Ele) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const container = document.querySelector('.mzl_position-container');
        container?.removeChild(document.querySelector('.mzl_position') as Node);
        onOpenChange?.(false);
      }, 150);
    }
  };

  return (
    <div className={classes} style={style} ref={tooltipRef} onMouseOver={tooltipMouseOver} onMouseOut={tooltipMouseOut}>
      {children}
    </div>
  );
};

export default Tooltip;
export type { TooltipProps };
