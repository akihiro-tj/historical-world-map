'use client';

import { Map, MapProps } from '@/components/map';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/sheet';
import { FC, MouseEventHandler } from 'react';

export interface MapModalContentProps {
  isOpen: boolean;
  onClose: MouseEventHandler<HTMLElement>;
  mapProps?: MapProps;
}

export const MapModalContent: FC<MapModalContentProps> = ({
  isOpen,
  onClose,
  mapProps,
}) => {
  return (
    <Sheet open={isOpen}>
      <SheetContent
        className="border-none bg-slate-900 w-full"
        onClose={onClose}
      >
        <SheetHeader className="relative z-10 space-y-1 mr-10">
          <SheetTitle className="text-white text-left">Country name</SheetTitle>
          <SheetDescription className="text-white text-left">
            1234
          </SheetDescription>
        </SheetHeader>
        {mapProps && <Map {...mapProps} />}
      </SheetContent>
    </Sheet>
  );
};
