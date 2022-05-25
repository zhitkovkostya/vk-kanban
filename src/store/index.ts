import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import boardReducer from './board/board.slice';
import cardsReducer from './cards/cards.slice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    board: boardReducer,
    cards: cardsReducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
