import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

export interface ICardList {
  id: string;
  title: string;
}

export interface IBoardState {
  byId: {
    [key: string]: ICardList;
  };
  editorId: string | null;
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
  editorId: null,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    createList: (state, action: PayloadAction<ICardList>) => {
      state.byId[action.payload.id] = action.payload;
    },
    setEditorId: (state, action: PayloadAction<string>) => {
      state.editorId = action.payload;
    },
    resetEditorId: (state) => {
      state.editorId = null;
    },
  },
});

export const { createList, setEditorId, resetEditorId } = boardSlice.actions;

export const selectCardLists = (state: RootState) => Object.values(state.board.byId);

export const selectIsFormShown = (state: RootState, id: string) => state.board.editorId === id;

export default boardSlice.reducer;
