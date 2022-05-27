import { useDroppable } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import React from 'react';

export interface ISortableColumn {
  children?: React.ReactNode;
  id: string;
  items: string[];
}

export function SortableColumn({ children, id, items }: ISortableColumn) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <SortableContext items={items}>
      <div ref={setNodeRef}>{children}</div>
    </SortableContext>
  );
}
