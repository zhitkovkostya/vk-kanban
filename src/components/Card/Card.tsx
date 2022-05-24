import React from 'react';
import { useDispatch } from 'react-redux';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { removeCard } from '../../store/cards/cards.slice';
import styles from './Card.module.css';

interface ICardProps {
  children?: React.ReactNode;
  id: string;
  index: number;
}

export function Card({ children, id, index }: ICardProps) {
  const dispatch = useDispatch();
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: { index },
  });

  const handleRemoveClick = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    event.preventDefault();

    dispatch(removeCard(id));
  };

  return (
    <div
      className={[styles.card, isDragging ? styles.cardIsDragging : null].join(' ')}
      style={{
        transform: isDragging ? `${CSS.Translate.toString(transform)} rotate(4deg)` : 'none',
      }}>
      <div className={styles.cardBody} ref={setNodeRef} {...attributes} {...listeners}>
        {children}
      </div>
      <button className={styles.cardRemoveButton} onClick={handleRemoveClick} title="Delete card">
        <svg
          className={styles.cardRemoveIcon}
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
}
