import React from 'react';
import { Board } from '../../components/Board/Board';
import { Card } from '../../components/Card/Card';
import { CardList } from '../../components/CardList/CardList';

export function BoardPage() {
  const renderMockCards = (count: number) =>
    new Array(count).fill(null).map((_, index) => <Card key={index}>Card {index + 1}</Card>);

  return (
    <Board>
      <CardList title="Card Panel 1">{renderMockCards(8)}</CardList>
      <CardList title="Card Panel 2">{renderMockCards(1)}</CardList>
      <CardList title="Card Panel 3">{renderMockCards(2)}</CardList>
    </Board>
  );
}
