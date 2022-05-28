import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MeasuringStrategy,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { moveCard, selectCardsById, selectCardsByListId } from '../../store/cards/cards.slice';
import { createList, ICardList } from '../../store/board/board.slice';
import { EditorForm } from '../EditorForm/EditorForm';
import { CardList } from '../CardList/CardList';
import styles from './Board.module.css';
import { SortableColumn } from '../../containers/SortableColumn/SortableColumn';
import { Card } from '../Card/Card';

interface IBoardProps {
  cardLists: ICardList[];
}

export const Board = React.memo(
  function Board({ cardLists }: IBoardProps) {
    const [isFormShown, setFormShown] = React.useState(false);
    const [activeDraggableId, setActiveDraggableId] = React.useState<string | null>(null);
    const [formValue, setFormValue] = React.useState<string>('');
    const cardsByListId = useSelector(selectCardsByListId);
    const cardsById = useSelector(selectCardsById);
    const dispatch = useDispatch();
    const touchSensor = useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    });
    const mouseSensor = useSensor(MouseSensor);
    const sensors = useSensors(mouseSensor, touchSensor);

    const handleDragStart = ({ active }: DragStartEvent) => {
      setActiveDraggableId(String(active.id));
    };

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
      const activeType = active.data.current?.type;

      if (over === null || active.id === over.id) {
        return;
      }

      const activeId = String(active.id);
      const overId = String(over.id);

      if (activeType === 'item') {
        const { containerId: activeContainerId } = active.data.current?.sortable;
        const overContainerId =
          over.data.current?.type === 'column' ? over.id : over.data.current?.sortable.containerId;
        const oldIndex = cardsByListId[activeContainerId].indexOf(activeId);
        const newIndex =
          over.data.current?.type === 'column' ? 0 : cardsByListId[overContainerId].indexOf(overId);

        dispatch(
          moveCard({
            id: activeId,
            sourceListId: activeContainerId,
            targetListId: overContainerId,
            sourceIndex: oldIndex,
            targetIndex: newIndex,
          })
        );
      }

      setActiveDraggableId(null);
    };

    const handleShowFormClick = () => {
      setFormShown(true);
    };

    const handleFormHideClick = () => {
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
        onDragStart={handleDragStart}
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
        <DragOverlay>
          {activeDraggableId && cardsById[activeDraggableId] ? (
            <Card id={activeDraggableId} isDraggable>
              {cardsById[activeDraggableId].title}
            </Card>
          ) : null}
        </DragOverlay>
      </DndContext>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.cardLists.length === nextProps.cardLists.length;
  }
);
