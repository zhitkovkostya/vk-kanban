import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { removeCard } from '../../store/cards/cards.slice';
import styles from './Card.module.css';

interface ICardProps {
  children?: React.ReactNode;
  id: string;
  index: number;
}

export function Card({ children, id, index }: ICardProps) {
  const dispatch = useDispatch();
  const [isActive, setActive] = React.useState(false);

  const handleMouseEnter = () => {
    setActive(true);
  };

  const handleMouseLeave = () => {
    setActive(false);
  };

  const handleRemoveClick = () => {
    dispatch(removeCard(id));
  };

  return (
    <Draggable index={index} draggableId={id}>
      {(provided) => (
        <div
          className={styles.card}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          data-is-active={isActive}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          {children}
          <button
            className={styles.cardRemoveButton}
            onClick={handleRemoveClick}
            title="Delete card">
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
      )}
    </Draggable>
  );
}
