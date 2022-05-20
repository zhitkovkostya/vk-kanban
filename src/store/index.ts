import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import boardReducer from './board/board.slice';
import cardsReducer from './cards/cards.slice';

export const store = configureStore({
  reducer: {
    board: boardReducer,
    cards: cardsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
