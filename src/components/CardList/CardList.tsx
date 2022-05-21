import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardCreationForm } from '../CardCreationForm/CardCreationForm';
import { Card } from '../Card/Card';
import { RootState } from '../../store';
import { createCard, selectCardsFromList } from '../../store/cards/cards.slice';
import { resetEditorId, selectIsFormShown, setEditorId } from '../../store/board/board.slice';
import styles from './CardList.module.css';

interface ICardListProps {
  id: string;
  title: string;
}

export function CardList({ id, title }: ICardListProps) {
  const [formValue, setFormValue] = React.useState<string>('');
  const dispatch = useDispatch();
  const isFormShown = useSelector((state: RootState) => selectIsFormShown(state, id));
  const cards = useSelector((state: RootState) => selectCardsFromList(state, id)) || [];

  const handleShowFormClick = () => {
    dispatch(setEditorId(id));
  };

  const handleHideFormClick = () => {
    dispatch(resetEditorId());
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormValue(event.target.value);
  };

  const handleFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (formValue.length > 0) {
      dispatch(
        createCard({
          id: String(Date.now()),
          parent_id: id,
          title: formValue,
        })
      );
    }

    setFormValue('');
    dispatch(resetEditorId());
  };

  return (
    <div className={styles.cardList}>
      <header className={styles.cardListHeader}>{title}</header>
      <main className={styles.cardListBody}>
        {cards.map((card) => (
          <Card id={card.id} key={card.id}>
            {card.title}
          </Card>
        ))}
      </main>
      <footer className={styles.cardListFooter}>
        {isFormShown && (
          <CardCreationForm
            value={formValue}
            onChange={handleFormChange}
            onSubmit={handleFormSubmit}
            onHideClick={handleHideFormClick}
          />
        )}
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
