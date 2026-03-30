import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Expense, ExpenseFilters } from '../../types/expense';

interface ExpenseState {
  items: Expense[];
  filters: ExpenseFilters;
  editingId: string | null;
}

const initialState: ExpenseState = {
  items: [],
  filters: { category: 'All', dateFrom: '', dateTo: '', search: '' },
  editingId: null,
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense(state, action: PayloadAction<Omit<Expense, 'id'>>) {
      state.items.push({ ...action.payload, id: crypto.randomUUID() });
    },
    updateExpense(state, action: PayloadAction<Expense>) {
      const idx = state.items.findIndex((e) => e.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
      state.editingId = null;
    },
    deleteExpense(state, action: PayloadAction<string>) {
      state.items = state.items.filter((e) => e.id !== action.payload);
    },
    setFilters(state, action: PayloadAction<Partial<ExpenseFilters>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
    setEditingId(state, action: PayloadAction<string | null>) {
      state.editingId = action.payload;
    },
  },
});

export const { addExpense, updateExpense, deleteExpense, setFilters, setEditingId } = expenseSlice.actions;
export default expenseSlice.reducer;
