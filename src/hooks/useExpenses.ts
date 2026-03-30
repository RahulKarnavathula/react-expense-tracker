import { useMemo } from 'react';
import { useAppSelector } from '../store';

export function useExpenses() {
  const { items, filters } = useAppSelector((s) => s.expenses);

  const filtered = useMemo(() => {
    return items.filter((e) => {
      if (filters.category !== 'All' && e.category !== filters.category) return false;
      if (filters.dateFrom && e.date < filters.dateFrom) return false;
      if (filters.dateTo && e.date > filters.dateTo) return false;
      if (filters.search && !e.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    });
  }, [items, filters]);

  const totalAmount = useMemo(() => filtered.reduce((sum, e) => sum + e.amount, 0), [filtered]);

  const byCategory = useMemo(() => {
    return filtered.reduce<Record<string, number>>((acc, e) => {
      acc[e.category] = (acc[e.category] ?? 0) + e.amount;
      return acc;
    }, {});
  }, [filtered]);

  const byMonth = useMemo(() => {
    return filtered.reduce<Record<string, number>>((acc, e) => {
      const month = e.date.slice(0, 7);
      acc[month] = (acc[month] ?? 0) + e.amount;
      return acc;
    }, {});
  }, [filtered]);

  return { filtered, totalAmount, byCategory, byMonth };
}
