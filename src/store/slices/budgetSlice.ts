import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Budget, Category } from '../../types/expense';

interface BudgetState { items: Budget[]; }

const defaultBudgets: Budget[] = [
  { category: 'Food', limit: 5000 },
  { category: 'Transport', limit: 2000 },
  { category: 'Housing', limit: 15000 },
  { category: 'Entertainment', limit: 3000 },
  { category: 'Healthcare', limit: 2000 },
  { category: 'Shopping', limit: 4000 },
  { category: 'Utilities', limit: 3000 },
  { category: 'Other', limit: 2000 },
];

const budgetSlice = createSlice({
  name: 'budgets',
  initialState: { items: defaultBudgets } as BudgetState,
  reducers: {
    setBudget(state, action: PayloadAction<Budget>) {
      const idx = state.items.findIndex((b) => b.category === action.payload.category);
      if (idx !== -1) state.items[idx] = action.payload;
      else state.items.push(action.payload);
    },
  },
});

export const { setBudget } = budgetSlice.actions;
export default budgetSlice.reducer;
