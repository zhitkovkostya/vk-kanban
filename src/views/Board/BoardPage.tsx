import React from 'react';
import { useSelector } from 'react-redux';
import { Board } from '../../components/Board/Board';
import { selectCardLists } from '../../store/board/board.slice';

export function BoardPage() {
  const cardLists = useSelector(selectCardLists);

  return <Board cardLists={cardLists} />;
}
