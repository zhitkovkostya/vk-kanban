import React from 'react';
import styles from './CardCreationForm.module.css';

interface ICardCreationFormProps {
  onHideFormClick: (event: React.SyntheticEvent) => void;
}

export function CardCreationForm({ onHideFormClick }: ICardCreationFormProps) {
  const handleFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.cardCreationForm}>
      <textarea
        autoFocus
        className={styles.cardCreationFormField}
        rows={3}
        placeholder="Enter card name"></textarea>
      <div className={styles.cardCreationFormButtons}>
        <button
          className={styles.cardCreationFormCreateButton}
          onClick={onHideFormClick}
          type="submit"
          title="Add card">
          Add card
        </button>
        <button
          className={styles.cardCreationFormCancelButton}
          type="button"
          title="Cancel"
          onClick={onHideFormClick}>
          <svg
            className={styles.cardCreationFormCancelIcon}
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </form>
  );
}
