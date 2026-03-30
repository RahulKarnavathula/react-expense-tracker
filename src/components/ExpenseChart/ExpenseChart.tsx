import React, { memo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import styles from './ExpenseChart.module.css';

const COLORS = ['#f59e0b','#3b82f6','#8b5cf6','#ec4899','#10b981','#f97316','#6366f1','#6b7280'];

interface Props {
  byCategory: Record<string, number>;
  byMonth: Record<string, number>;
}

export const ExpenseChart: React.FC<Props> = memo(({ byCategory, byMonth }) => {
  const pieData = Object.entries(byCategory).map(([name, value]) => ({ name, value }));
  const barData = Object.entries(byMonth)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([month, amount]) => ({ month: month.slice(5), amount }));

  return (
    <div className={styles.wrapper}>
      <div className={styles.chart}>
        <h3 className={styles.chartTitle}>By Category</h3>
        {pieData.length ? (
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v: number) => `₹${v.toLocaleString('en-IN')}`} />
            </PieChart>
          </ResponsiveContainer>
        ) : <p className={styles.noData}>No data yet</p>}
      </div>
      <div className={styles.chart}>
        <h3 className={styles.chartTitle}>Monthly Trend</h3>
        {barData.length ? (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(v: number) => `₹${v.toLocaleString('en-IN')}`} />
              <Bar dataKey="amount" fill="#4f46e5" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : <p className={styles.noData}>No data yet</p>}
      </div>
    </div>
  );
});
ExpenseChart.displayName = 'ExpenseChart';
