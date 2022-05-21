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
    panel_1: {
      id: 'panel_1',
      title: 'Panel 1',
    },
    panel_2: {
      id: 'panel_2',
      title: 'Panel 2',
    },
    panel_3: {
      id: 'panel_3',
      title: 'Panel 3',
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
