import 'react-popper-tooltip/dist/styles.css';

import clsx from 'clsx';
import { usePopperTooltip } from 'react-popper-tooltip';

import { Icon } from '../Icon/Icon';

type TooltipProps = {
  info: string;
  icon?: string;
  className?: string;
};

export const Tooltip = ({ info, icon, className }: TooltipProps) => {
  const { getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip();

  return (
    <div className={clsx(className)}>
      <button type="button" ref={setTriggerRef}>
        <Icon id={icon ? icon : 'info-circle'} className="h-4 w-4" />
      </button>
      {visible && (
        <div ref={setTooltipRef} {...getTooltipProps({ className: 'tooltip-container' })}>
          <div {...getArrowProps({ className: 'tooltip-arrow' })} />
          <span className="text-xs">{info}</span>
        </div>
      )}
    </div>
  );
};
