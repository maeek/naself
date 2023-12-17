import { PayloadAction, UnknownAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

type UUIDv7 = string;

export interface Dialog {
  id: UUIDv7;
  title: string;
  description: string;
  type: 'info' | 'warning' | 'error' | 'success' | 'confirm';
  acknowledgeActions?: UnknownAction[];
}

export const dialogsAdapter = createEntityAdapter();

const dialogsSlice = createSlice({
  name: 'dialogs',
  initialState: dialogsAdapter.getInitialState(),
  reducers: {
    openDialogs: (state, action: PayloadAction<{ dialogs: Dialog[]; prepend?: boolean }>) => {
      if (action.payload.prepend) {
        state.ids = [...action.payload.dialogs.map(dialog => dialog.id), ...state.ids];
        state.entities = {
          ...action.payload.dialogs.reduce((acc, dialog) => ({ ...acc, [dialog.id]: dialog }), {}),
          ...state.entities
        };
      } else {
        dialogsAdapter.addMany(state, action.payload.dialogs);
      }
    },
    closeDialogs: dialogsAdapter.removeMany,
    removeAllDialogs: dialogsAdapter.removeAll
  }
});

export const dialogsReducer = dialogsSlice.reducer;
export const { closeDialogs, openDialogs, removeAllDialogs } = dialogsSlice.actions;
