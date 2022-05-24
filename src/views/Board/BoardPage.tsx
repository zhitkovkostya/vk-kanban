import React from 'react';
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Board } from '../../components/Board/Board';
import { CardList } from '../../components/CardList/CardList';
import { selectCardLists } from '../../store/board/board.slice';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { moveCard } from '../../store/cards/cards.slice';

export function BoardPage() {
  const cardLists = useSelector(selectCardLists);

  return (
    <Board>
      {cardLists.map((cardList) => (
        <CardList key={cardList.id} id={cardList.id} title={cardList.title} />
      ))}
    </Board>
  );
}
