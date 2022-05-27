import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { ICardList } from '../board/board.slice';

export interface ICard {
  id: string;
  title: string;
}

export interface ICardWithParentId extends ICard {
  parentId: string;
}

export interface ICardPosition {
  id: string;
  targetIndex: number;
}

export interface ICardsState {
  byId: {
    [key: string]: ICard;
  };
  byListId: {
    [key: string]: string[];
  };
}

const initialState: ICardsState = {
  byId: {
    card_1: {
      id: 'card_1',
      title: 'Card 1',
    },
    card_2: {
      id: 'card_2',
      title: 'Card 2',
    },
    card_3: {
      id: 'card_3',
      title: 'Card 3',
    },
  },
  byListId: {
    list_1: ['card_1', 'card_2'],
    list_2: ['card_3'],
    list_3: [],
  },
};

const createList = createAction<ICardList>('board/createList');
const removeList = createAction<string>('board/removeList');

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    createCard: (state, action: PayloadAction<ICardWithParentId>) => {
      const { id, title, parentId } = action.payload;
      state.byId[action.payload.id] = { id, title };
      state.byListId[parentId].push(id);
    },
    removeCard: (state, action: PayloadAction<string>) => {
      const byIdClone = { ...state.byId };
      delete byIdClone[action.payload];

      const parentId = Object.keys(state.byListId).find((listId) =>
        state.byListId[listId].includes(action.payload)
      );

      state.byId = byIdClone;
      state.byListId[parentId!] = state.byListId[parentId!].filter(
        (cardId) => cardId !== action.payload
      );
    },
    moveCard: (state, action: PayloadAction<ICardPosition>) => {
      const { id: cardId, targetIndex } = action.payload;
      const sourceParent = Object.entries(state.byListId).find((list) => list[1].includes(cardId));
      const targetParent = sourceParent;

      if (sourceParent === undefined || targetParent === undefined) {
        return;
      }

      const sourceParentId = sourceParent[0];
      const targetParentId = targetParent[0];

      const sourceIndex = state.byListId[sourceParentId].indexOf(cardId);

      state.byListId[sourceParentId].splice(sourceIndex, 1);
      state.byListId[targetParentId].splice(targetIndex, 0, cardId);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createList, (state, action: PayloadAction<ICardList>) => {
      state.byListId[action.payload.id] = [];
    });
    builder.addCase(removeList, (state, action: PayloadAction<string>) => {
      delete state.byListId[action.payload];
    });
  },
});

export const { createCard, removeCard, moveCard } = cardsSlice.actions;

export const selectCards = (state: RootState) => Object.values(state.cards.byId);
export const selectCardsByListId = (state: RootState) => state.cards.byListId;

/**
 *
 * @param state App state
 * @param id Parent list id
 * @returns Card item
 */
export const selectCardsFromList = (state: RootState, id: string) => {
  const cardsByList = state.cards.byListId[id] || [];
  return cardsByList.map((cardId) => state.cards.byId[cardId]);
};

export default cardsSlice.reducer;
