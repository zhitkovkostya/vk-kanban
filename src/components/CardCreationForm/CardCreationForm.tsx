import React from 'react';
import styles from './CardCreationForm.module.css';

interface ICardCreationFormProps {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (event: React.SyntheticEvent) => void;
  onHideClick: (event: React.SyntheticEvent) => void;
  value: string;
}

export function CardCreationForm({
  onChange,
  onSubmit,
  onHideClick,
  value,
}: ICardCreationFormProps) {
  return (
    <form onSubmit={onSubmit} className={styles.cardCreationForm}>
      <textarea
        autoFocus
        className={styles.cardCreationFormField}
        onChange={onChange}
        rows={3}
        value={value}
        placeholder="Enter card name"></textarea>
      <div className={styles.cardCreationFormButtons}>
        <button className={styles.cardCreationFormCreateButton} type="submit" title="Add card">
          Add card
        </button>
        <button
          className={styles.cardCreationFormCancelButton}
          type="button"
          title="Cancel"
          onClick={onHideClick}>
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
