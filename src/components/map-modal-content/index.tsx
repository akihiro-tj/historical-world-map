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
      <SheetContent onClose={onClose}>
        <SheetHeader className="relative z-10">
          <SheetTitle>title</SheetTitle>
          <SheetDescription>description</SheetDescription>
        </SheetHeader>
        {mapProps && <Map {...mapProps} />}
      </SheetContent>
    </Sheet>
  );
};
