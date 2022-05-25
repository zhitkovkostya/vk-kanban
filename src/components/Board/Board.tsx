import React from 'react';
import { useDispatch } from 'react-redux';
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { moveCard } from '../../store/cards/cards.slice';
import { createList, ICardList } from '../../store/board/board.slice';
import { EditorForm } from '../EditorForm/EditorForm';
import { CardList } from '../CardList/CardList';
import styles from './Board.module.css';

interface IBoardProps {
  cardLists: ICardList[];
}

export const Board = React.memo(
  function Board({ cardLists }: IBoardProps) {
    const [isFormShown, setFormShown] = React.useState(false);
    const [formValue, setFormValue] = React.useState<string>('');
    const dispatch = useDispatch();
    const sensors = useSensors(
      useSensor(MouseSensor),
      useSensor(TouchSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );

    function handleDragEnd({ active, over }: DragEndEvent) {
      if (over === null) {
        return;
      }
      const id = String(active.id);
      const targetParentId = String(over.id);

      dispatch(
        moveCard({
          id,
          targetIndex: 0,
          targetParentId,
        })
      );
    }

    const handleShowFormClick = (event: React.SyntheticEvent) => {
      setFormShown(true);
    };

    const handleFormHideClick = (event: React.SyntheticEvent) => {
      setFormValue('');
      setFormShown(false);
    };

    const handleFormChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setFormValue(event.target.value);
    };

    const handleFormSubmit = (event: React.SyntheticEvent) => {
      event.preventDefault();

      if (formValue.length > 0) {
        dispatch(
          createList({
            id: String(Date.now()),
            title: formValue,
          })
        );
      }

      setFormValue('');
      setFormShown(false);
    };

    return (
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <div className={styles.board}>
          {cardLists.map((cardList) => (
            <CardList key={cardList.id} id={cardList.id} title={cardList.title} />
          ))}
          {isFormShown && (
            <CardList id="new_list" isNew>
              <EditorForm
                onChange={handleFormChange}
                onSubmit={handleFormSubmit}
                onHideClick={handleFormHideClick}
                placeholder="Enter list name"
                submitText="Add list"
                value={formValue}
              />
            </CardList>
          )}
          <button
            className={styles.boardShowFormButton}
            title="Add list"
            onClick={handleShowFormClick}>
            <svg
              className={styles.boardShowFormIcon}
              viewBox="0 0 24 24"
              width="18"
              height="18"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span className={styles.boardShowFormText}>Add list</span>
          </button>
        </div>
      </DndContext>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.cardLists.length === nextProps.cardLists.length;
  }
);
