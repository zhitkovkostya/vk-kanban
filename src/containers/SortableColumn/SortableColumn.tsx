import React from 'react';
import { SortableContext } from '@dnd-kit/sortable';

export interface ISortableColumn {
  children?: React.ReactNode;
  id: string;
  items: string[];
}

export function SortableColumn({ children, id, items }: ISortableColumn) {
  return (
    <SortableContext id={id} items={items}>
      {children}
    </SortableContext>
  );
}
