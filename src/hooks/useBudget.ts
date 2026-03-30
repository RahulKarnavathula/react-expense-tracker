import { useMemo } from 'react';
import { useAppSelector } from '../store';
import { Category } from '../types/expense';

export function useBudget() {
  const budgets = useAppSelector((s) => s.budgets.items);
  const { items } = useAppSelector((s) => s.expenses);

  const currentMonth = new Date().toISOString().slice(0, 7);

  const spendingThisMonth = useMemo(() => {
    return items
      .filter((e) => e.date.startsWith(currentMonth))
      .reduce<Record<string, number>>((acc, e) => {
        acc[e.category] = (acc[e.category] ?? 0) + e.amount;
        return acc;
      }, {});
  }, [items, currentMonth]);

  const alerts = useMemo(() => {
    return budgets
      .filter((b) => (spendingThisMonth[b.category] ?? 0) >= b.limit * 0.8)
      .map((b) => ({
        category: b.category as Category,
        spent: spendingThisMonth[b.category] ?? 0,
        limit: b.limit,
        exceeded: (spendingThisMonth[b.category] ?? 0) >= b.limit,
      }));
  }, [budgets, spendingThisMonth]);

  return { budgets, spendingThisMonth, alerts };
}
