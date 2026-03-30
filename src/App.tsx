import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { ExpenseForm } from './components/ExpenseForm/ExpenseForm';
import { ExpenseList } from './components/ExpenseList/ExpenseList';
import { ExpenseChart } from './components/ExpenseChart/ExpenseChart';
import { BudgetAlert } from './components/BudgetAlert/BudgetAlert';
import { useExpenses } from './hooks/useExpenses';
import { useAppDispatch, useAppSelector } from './store';
import { setFilters } from './store/slices/expenseSlice';
import styles from './App.module.css';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((s) => s.expenses.filters);
  const { filtered, totalAmount, byCategory, byMonth } = useExpenses();

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>💰 Expense Tracker</h1>
        <p>Total: <strong>₹{totalAmount.toLocaleString('en-IN')}</strong></p>
      </header>
      <main className={styles.main}>
        <section className={styles.left}>
          <ExpenseForm />
          <div className={styles.filterBar}>
            <input type="text" placeholder="Search..." value={filters.search}
              onChange={(e) => dispatch(setFilters({ search: e.target.value }))} />
            <input type="date" value={filters.dateFrom}
              onChange={(e) => dispatch(setFilters({ dateFrom: e.target.value }))} />
            <input type="date" value={filters.dateTo}
              onChange={(e) => dispatch(setFilters({ dateTo: e.target.value }))} />
          </div>
          <BudgetAlert />
          <ExpenseList expenses={filtered} />
        </section>
        <section className={styles.right}>
          <ExpenseChart byCategory={byCategory} byMonth={byMonth} />
        </section>
      </main>
    </div>
  );
};

const App: React.FC = () => (
  <Provider store={store}><Dashboard /></Provider>
);

export default App;
