import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

export interface ISortableItemProps {
  renderCard: (isDragging: boolean, listeners?: SyntheticListenerMap) => React.ReactNode;
  id: string;
  index: number;
}

export function SortableItem({ renderCard, id, index }: ISortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    data: {
      index,
    },
  });

  const styles = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 0,
  };

  return (
    <div ref={setNodeRef} style={styles} {...attributes}>
      {renderCard(isDragging, listeners)}
    </div>
  );
}
