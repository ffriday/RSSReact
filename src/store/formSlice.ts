import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TFormData } from '../constants';

const createFormSlice = (name: string) =>
  createSlice({
    name,
    initialState: {
      name: '',
      age: 0,
      email: '',
      password: '',
      country: '',
      gender: '',
      agree: '',
      image: '',
    },
    reducers: {
      updateData(state, action: PayloadAction<TFormData>) {
        return { ...state, ...action.payload };
      },
    },
  });

const componentSlice = createFormSlice('componentSlice');
const hookSlice = createFormSlice('hookSlice');

export const { reducer: componentReducer } = componentSlice;
export const { reducer: hookReducer } = hookSlice;

export const { updateData: updateComponentData } = componentSlice.actions;
export const { updateData: updateHooktData } = hookSlice.actions;
