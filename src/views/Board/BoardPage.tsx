import React from 'react';
import { useSelector } from 'react-redux';
import { Board } from '../../components/Board/Board';
import { Card } from '../../components/Card/Card';
import { CardList } from '../../components/CardList/CardList';
import { selectCardLists } from '../../store/board/board.slice';
import { selectCards } from '../../store/cards/cards.slice';

export function BoardPage() {
  const cardLists = useSelector(selectCardLists);
  const cards = useSelector(selectCards);
  const renderCards = () => cards.map((card) => <Card key={card.id}>{card.title}</Card>);

  return (
    <Board>
      {cardLists.map((cardList) => (
        <CardList key={cardList.id} title={cardList.title}>
          {renderCards()}
        </CardList>
      ))}
    </Board>
  );
}
