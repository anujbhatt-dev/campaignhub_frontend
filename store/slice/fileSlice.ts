// redux/fileSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FileState {
  file: File | null;
}

const initialState: FileState = {
  file: null,
};

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setFile: (state, action: PayloadAction<File>) => {
      state.file = action.payload; // Set the file in the Redux state
    },
    clearFile: (state) => {
      state.file = null; // Clear the file in the Redux state
    },
  },
});

export const { setFile, clearFile } = fileSlice.actions;
export const filesReducer =  fileSlice.reducer;
