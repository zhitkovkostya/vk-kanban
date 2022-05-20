import React from 'react';
import styles from './Board.module.css';

interface IBoardProps {
  children?: React.ReactNode;
}

export function Board({ children }: IBoardProps) {
  return <div className={styles.board}>{children}</div>;
}
