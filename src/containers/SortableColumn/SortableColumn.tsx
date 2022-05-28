import React from 'react';
import { SortableContext } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';

export interface ISortableColumn {
  children?: React.ReactNode;
  id: string;
  items: string[];
}

export function SortableColumn({ children, id, items }: ISortableColumn) {
  const { setNodeRef } = useDroppable({
    id: id,
    data: { type: 'column' },
  });
  return (
    <div ref={setNodeRef}>
      <SortableContext id={id} items={items}>
        {children}
      </SortableContext>
    </div>
  );
}
