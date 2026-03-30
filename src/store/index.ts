import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import expenseReducer from './slices/expenseSlice';
import budgetReducer from './slices/budgetSlice';

const loadState = () => {
  try {
    const s = localStorage.getItem('expenseStore');
    return s ? JSON.parse(s) : undefined;
  } catch { return undefined; }
};

export const store = configureStore({
  reducer: { expenses: expenseReducer, budgets: budgetReducer },
  preloadedState: loadState(),
});

store.subscribe(() => {
  try {
    localStorage.setItem('expenseStore', JSON.stringify(store.getState()));
  } catch { /* ignore */ }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
