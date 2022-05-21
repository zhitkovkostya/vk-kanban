import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

export interface ICard {
  id: string;
  parent_id: string;
  title: string;
}

export interface ICardsState {
  byId: {
    [key: string]: ICard;
  };
}

const initialState: ICardsState = {
  byId: {
    card_1: {
      id: 'card_1',
      parent_id: 'list_1',
      title: 'Card 1',
    },
    card_2: {
      id: 'card_2',
      parent_id: 'list_1',
      title: 'Card 2',
    },
    card_3: {
      id: 'card_3',
      parent_id: 'list_2',
      title: 'Card 3',
    },
  },
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    createCard: (state, action: PayloadAction<ICard>) => {
      state.byId[action.payload.id] = action.payload;
    },
    removeCard: (state, action: PayloadAction<string>) => {
      const byIdClone = { ...state.byId };
      delete byIdClone[action.payload];
      state.byId = byIdClone;
    },
  },
});

export const { createCard, removeCard } = cardsSlice.actions;

export const selectCards = (state: RootState) => Object.values(state.cards.byId);

/**
 *
 * @param state App state
 * @param id Parent list id
 * @returns Card item
 */
export const selectCardsFromList = (state: RootState, id: string) => {
  return selectCards(state).filter((card) => card.parent_id === id);
};

export default cardsSlice.reducer;
