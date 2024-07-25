import { FC } from 'react';

export interface TooltipProps {
  x: number;
  y: number;
  content: string;
}

export const Tooltip: FC<TooltipProps> = ({ x, y, content }) => {
  return (
    <div
      className="absolute z-50 -translate-x-1/2 -translate-y-[calc(100%+10px)] overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md"
      style={{
        top: y + 'px',
        left: x + 'px',
      }}
    >
      {content}
    </div>
  );
};
