'use client';

import { Map, MapProps } from '@/components/map';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/shadcn-ui/sheet';
import { FC, MouseEventHandler, useMemo } from 'react';

export interface MapModalContentProps {
  onClose: MouseEventHandler<HTMLElement>;
  mapProps: MapProps | null;
}

export const MapModalContent: FC<MapModalContentProps> = ({
  onClose,
  mapProps,
}) => {
  const isOpen = useMemo(() => !!mapProps, [mapProps]);
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
