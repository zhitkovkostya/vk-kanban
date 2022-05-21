import React from 'react';
import { useSelector } from 'react-redux';
import { Board } from '../../components/Board/Board';
import { CardList } from '../../components/CardList/CardList';
import { selectCardLists } from '../../store/board/board.slice';

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
