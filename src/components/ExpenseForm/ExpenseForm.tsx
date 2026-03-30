import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { addExpense, updateExpense } from '../../store/slices/expenseSlice';
import { Category, Expense } from '../../types/expense';
import styles from './ExpenseForm.module.css';

const CATEGORIES: Category[] = ['Food','Transport','Housing','Entertainment','Healthcare','Shopping','Utilities','Other'];

const empty = (): Omit<Expense, 'id'> => ({
  title: '', amount: 0, category: 'Food',
  date: new Date().toISOString().slice(0, 10), notes: '',
});

export const ExpenseForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const editingId = useAppSelector((s) => s.expenses.editingId);
  const editingItem = useAppSelector((s) => s.expenses.items.find((e) => e.id === editingId));
  const [form, setForm] = useState(empty());

  useEffect(() => {
    if (editingItem) {
      const { id, ...rest } = editingItem;
      setForm(rest);
    } else {
      setForm(empty());
    }
  }, [editingItem]);

  const set = (field: keyof typeof form, value: string | number) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || form.amount <= 0) return;
    if (editingId) {
      dispatch(updateExpense({ ...form, id: editingId }));
    } else {
      dispatch(addExpense(form));
      setForm(empty());
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>{editingId ? 'Edit Expense' : 'Add Expense'}</h2>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="title">Title</label>
          <input id="title" type="text" value={form.title} required
            onChange={(e) => set('title', e.target.value)} placeholder="e.g. Lunch" />
        </div>
        <div className={styles.field}>
          <label htmlFor="amount">Amount (₹)</label>
          <input id="amount" type="number" min="1" value={form.amount || ''} required
            onChange={(e) => set('amount', Number(e.target.value))} />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="category">Category</label>
          <select id="category" value={form.category}
            onChange={(e) => set('category', e.target.value as Category)}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="date">Date</label>
          <input id="date" type="date" value={form.date} required
            onChange={(e) => set('date', e.target.value)} />
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor="notes">Notes (optional)</label>
        <textarea id="notes" rows={2} value={form.notes}
          onChange={(e) => set('notes', e.target.value)} placeholder="Any additional details..." />
      </div>
      <button type="submit" className={styles.submit}>
        {editingId ? 'Update Expense' : 'Add Expense'}
      </button>
    </form>
  );
};
