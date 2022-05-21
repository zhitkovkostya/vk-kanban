import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

export interface ICardList {
  id: string;
  title: string;
}

export interface IBoardState {
  byId: {
    [key: string]: ICardList;
  };
}

const initialState: IBoardState = {
  byId: {
    list_1: {
      id: 'list_1',
      title: 'List 1',
    },
    list_2: {
      id: 'list_2',
      title: 'List 2',
    },
    list_3: {
      id: 'list_3',
      title: 'List 3',
    },
  },
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    createCardList: (state, action) => {},
  },
});

export const { createCardList } = boardSlice.actions;

export const selectCardLists = (state: RootState) => Object.values(state.board.byId);

export default boardSlice.reducer;
