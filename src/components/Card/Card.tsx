import React from 'react';
import styles from './Card.module.css';

interface ICardProps {
  children?: React.ReactNode;
}

export function Card({ children }: ICardProps) {
  return <div className={styles.card}>{children}</div>;
}
