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
  isOpen: boolean;
  onClose: MouseEventHandler<HTMLElement>;
  focusedMapFeature?: MapProps['focusedMapFeature'];
}

export const MapModalContent: FC<MapModalContentProps> = ({
  isOpen,
  onClose,
  focusedMapFeature,
}) => {
  return (
    <Sheet open={isOpen}>
      <SheetContent onClose={onClose}>
        <SheetHeader className="relative z-10">
          <SheetTitle>title</SheetTitle>
          <SheetDescription>description</SheetDescription>
        </SheetHeader>
        <Map focusedMapFeature={focusedMapFeature} />
      </SheetContent>
    </Sheet>
  );
};
