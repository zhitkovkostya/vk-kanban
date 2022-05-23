import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Board } from '../../components/Board/Board';
import { CardList } from '../../components/CardList/CardList';
import { selectCardLists } from '../../store/board/board.slice';
import { moveCard } from '../../store/cards/cards.slice';

export function BoardPage() {
  const dispatch = useDispatch();
  const cardLists = useSelector(selectCardLists);

  function handleDragEnd({ draggableId, source, destination }: DropResult) {
    if (
      destination === null ||
      destination === undefined ||
      destination.index === undefined ||
      destination.droppableId === undefined
    ) {
      return;
    }

    dispatch(
      moveCard({
        id: draggableId,
        sourceIndex: source.index,
        targetIndex: destination.index,
        sourceParentId: source.droppableId,
        targetParentId: destination.droppableId,
      })
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Board>
        {cardLists.map((cardList) => (
          <CardList key={cardList.id} id={cardList.id} title={cardList.title} />
        ))}
      </Board>
    </DragDropContext>
  );
}
