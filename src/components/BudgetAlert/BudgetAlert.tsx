import React from 'react';
import { useBudget } from '../../hooks/useBudget';
import styles from './BudgetAlert.module.css';

export const BudgetAlert: React.FC = () => {
  const { alerts } = useBudget();
  if (!alerts.length) return null;

  return (
    <div className={styles.wrapper}>
      {alerts.map((alert) => (
        <div key={alert.category} className={`${styles.alert} ${alert.exceeded ? styles.exceeded : styles.warning}`}
          role="alert">
          <span className={styles.icon}>{alert.exceeded ? '🚨' : '⚠️'}</span>
          <div>
            <strong>{alert.category}</strong>
            {alert.exceeded
              ? ` — Budget exceeded! Spent ₹${alert.spent.toLocaleString('en-IN')} of ₹${alert.limit.toLocaleString('en-IN')}`
              : ` — Approaching limit. Spent ₹${alert.spent.toLocaleString('en-IN')} of ₹${alert.limit.toLocaleString('en-IN')}`}
          </div>
        </div>
      ))}
    </div>
  );
};
