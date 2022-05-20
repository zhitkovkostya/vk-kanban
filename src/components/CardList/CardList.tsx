import React from 'react';
import styles from './CardList.module.css';

interface ICardListProps {
  children?: React.ReactNode;
  title: string;
}

export function CardList({ children, title }: ICardListProps) {
  return (
    <div className={styles.cardList}>
      <header className={styles.cardListHeader}>{title}</header>
      <main className={styles.cardListBody}>{children}</main>
      <footer className={styles.cardListFooter}>
        <button className={styles.cardListCreateButton} type="button">
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
          <span className={styles.cardListCreateButtonIcon}>Add card</span>
        </button>
      </footer>
    </div>
  );
}
