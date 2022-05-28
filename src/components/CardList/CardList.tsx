import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditorForm } from '../EditorForm/EditorForm';
import { Card } from '../Card/Card';
import { RootState } from '../../store';
import { createCard, selectCardsFromList } from '../../store/cards/cards.slice';
import {
  removeList,
  resetEditorId,
  selectIsFormShown,
  setEditorId,
} from '../../store/board/board.slice';
import styles from './CardList.module.css';
import { SortableContext } from '@dnd-kit/sortable';
import { SortableItem } from '../../containers/SortableItem/SortableItem';

interface ICardListProps {
  id: string;
  isNew?: boolean;
  children?: React.ReactNode;
  title?: string;
}

export function CardList({ id, isNew = false, children, title }: ICardListProps) {
  const [formValue, setFormValue] = React.useState<string>('');
  const dispatch = useDispatch();
  const isFormShown = useSelector((state: RootState) => selectIsFormShown(state, id));
  const cards = useSelector((state: RootState) => selectCardsFromList(state, id)) || [];

  const handleShowFormClick = () => {
    dispatch(setEditorId(id));
  };

  const handleHideFormClick = () => {
    setFormValue('');
    dispatch(resetEditorId());
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormValue(event.target.value);
  };

  const handleFormSubmit = () => {
    if (formValue.length > 0) {
      dispatch(
        createCard({
          id: String(Date.now()),
          parentId: id,
          title: formValue,
        })
      );
    }

    setFormValue('');
    dispatch(resetEditorId());
  };

  const handleRemoveClick = () => {
    dispatch(removeList(id));
  };

  const renderRemoveButton = () => (
    <button
      className={styles.cardListRemoveButton}
      type="button"
      title="Delete list"
      onClick={handleRemoveClick}>
      <svg
        className={styles.cardListRemoveIcon}
        viewBox="0 0 24 24"
        width="16"
        height="16"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  );

  const renderFormShowButton = () => (
    <button className={styles.cardListCreateButton} onClick={handleShowFormClick} type="button">
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
  );

  return (
    <SortableContext items={cards.map((card) => card.id)}>
      <div className={styles.cardList}>
        {title && (
          <header className={styles.cardListHeader}>
            {title}
            {renderRemoveButton()}
          </header>
        )}
        {children && <main className={styles.cardListBody}>{children}</main>}
        {cards.length > 0 && (
          <main className={styles.cardListBody}>
            {cards.map((card, cardIndex) => (
              <SortableItem
                key={card.id}
                id={card.id}
                index={cardIndex}
                renderCard={(isDraggable, listeners) => (
                  <Card id={card.id} isDraggable={isDraggable} dragHandleListeners={listeners}>
                    {card.title}
                  </Card>
                )}
              />
            ))}
          </main>
        )}
        {!isNew && (
          <footer className={styles.cardListFooter}>
            {isFormShown && (
              <EditorForm
                placeholder="Enter card name"
                submitText="Add card"
                value={formValue}
                submit={handleFormSubmit}
                onChange={handleFormChange}
                onHideClick={handleHideFormClick}
              />
            )}
            {!isFormShown && renderFormShowButton()}
          </footer>
        )}
      </div>
    </SortableContext>
  );
}
