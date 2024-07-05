'use client';

import { Map } from '@/components/map';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/shadcn-ui/sheet';
import { FC, MouseEventHandler } from 'react';

export interface MapModalContentProps {
  isOpen: boolean;
  onClose: MouseEventHandler<HTMLElement>;
}

export const MapModalContent: FC<MapModalContentProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Sheet open={isOpen}>
      <SheetContent onClose={onClose}>
        <SheetHeader>
          <SheetTitle>title</SheetTitle>
          <SheetDescription>description</SheetDescription>
        </SheetHeader>
        <Map />
      </SheetContent>
    </Sheet>
  );
};
