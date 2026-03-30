import React, { memo } from 'react';
import { useAppDispatch } from '../../store';
import { deleteExpense, setEditingId } from '../../store/slices/expenseSlice';
import { Expense } from '../../types/expense';
import styles from './ExpenseList.module.css';

const CATEGORY_COLOR: Record<string, string> = {
  Food: '#f59e0b', Transport: '#3b82f6', Housing: '#8b5cf6',
  Entertainment: '#ec4899', Healthcare: '#10b981', Shopping: '#f97316',
  Utilities: '#6366f1', Other: '#6b7280',
};

interface Props { expenses: Expense[]; }

export const ExpenseList: React.FC<Props> = memo(({ expenses }) => {
  const dispatch = useAppDispatch();

  if (!expenses.length)
    return <p className={styles.empty}>No expenses found. Add your first one above!</p>;

  return (
    <ul className={styles.list}>
      {[...expenses].sort((a, b) => b.date.localeCompare(a.date)).map((exp) => (
        <li key={exp.id} className={styles.item}>
          <span className={styles.dot} style={{ background: CATEGORY_COLOR[exp.category] }} aria-hidden />
          <div className={styles.info}>
            <span className={styles.expTitle}>{exp.title}</span>
            <span className={styles.meta}>{exp.category} · {new Date(exp.date).toLocaleDateString()}</span>
            {exp.notes && <span className={styles.notes}>{exp.notes}</span>}
          </div>
          <span className={styles.amount}>₹{exp.amount.toLocaleString('en-IN')}</span>
          <div className={styles.actions}>
            <button onClick={() => dispatch(setEditingId(exp.id))} aria-label={`Edit ${exp.title}`}>✏️</button>
            <button onClick={() => dispatch(deleteExpense(exp.id))} aria-label={`Delete ${exp.title}`}>🗑️</button>
          </div>
        </li>
      ))}
    </ul>
  );
});
ExpenseList.displayName = 'ExpenseList';
