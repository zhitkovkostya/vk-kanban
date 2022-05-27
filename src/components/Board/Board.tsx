import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DndContext,
  DragEndEvent,
  MeasuringStrategy,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { moveCard, selectCardsByListId } from '../../store/cards/cards.slice';
import { createList, ICardList } from '../../store/board/board.slice';
import { EditorForm } from '../EditorForm/EditorForm';
import { CardList } from '../CardList/CardList';
import styles from './Board.module.css';
import { SortableColumn } from '../../containers/SortableColumn/SortableColumn';

interface IBoardProps {
  cardLists: ICardList[];
}

export const Board = React.memo(
  function Board({ cardLists }: IBoardProps) {
    const [isFormShown, setFormShown] = React.useState(false);
    const [formValue, setFormValue] = React.useState<string>('');
    const cardsByListId = useSelector(selectCardsByListId) || [];
    const dispatch = useDispatch();
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    function handleDragEnd({ active, over }: DragEndEvent) {
      if (over === null) {
        return;
      }
      const id = String(active.id);
      const targetIndex = over.data.current ? over.data.current.index : 0;

      dispatch(
        moveCard({
          id,
          targetIndex,
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

    const handleFormSubmit = () => {
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
      <DndContext
        onDragEnd={handleDragEnd}
        sensors={sensors}
        measuring={{
          droppable: {
            strategy: MeasuringStrategy.Always,
          },
        }}>
        <div className={styles.board}>
          {cardLists.map((cardList) => (
            <SortableColumn id={cardList.id} items={cardsByListId[cardList.id]} key={cardList.id}>
              <CardList id={cardList.id} title={cardList.title} />
            </SortableColumn>
          ))}
          {isFormShown && (
            <CardList id="new_list" isNew>
              <EditorForm
                onChange={handleFormChange}
                onHideClick={handleFormHideClick}
                submit={handleFormSubmit}
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
