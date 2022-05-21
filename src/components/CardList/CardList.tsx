import React from 'react';
import { useSelector } from 'react-redux';
import { CardCreationForm } from '../CardCreationForm/CardCreationForm';
import { selectCardsFromList } from '../../store/cards/cards.slice';
import styles from './CardList.module.css';
import { RootState } from '../../store';
import { Card } from '../Card/Card';

interface ICardListProps {
  id: string;
  title: string;
}

export function CardList({ id, title }: ICardListProps) {
  const [isFormShown, setFormShown] = React.useState(false);
  const cards = useSelector((state: RootState) => selectCardsFromList(state, id)) || [];

  const handleShowFormClick = () => {
    setFormShown(true);
  };

  const handleHideFormClick = () => {
    setFormShown(false);
  };

  return (
    <div className={styles.cardList}>
      <header className={styles.cardListHeader}>{title}</header>
      <main className={styles.cardListBody}>
        {cards.map((card) => (
          <Card key={card.id}>{card.title}</Card>
        ))}
      </main>
      <footer className={styles.cardListFooter}>
        {isFormShown && <CardCreationForm cardListId={id} onHideFormClick={handleHideFormClick} />}
        {!isFormShown && (
          <button
            className={styles.cardListCreateButton}
            onClick={handleShowFormClick}
            type="button">
            <svg
              className={styles.cardListCreateButtonIcon}
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
            <span className={styles.cardListCreateButtonText}>Add card</span>
          </button>
        )}
      </footer>
    </div>
  );
}
