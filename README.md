# React Expense Tracker

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-007ACC?style=flat-square&logo=typescript)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?style=flat-square&logo=redux)
![Recharts](https://img.shields.io/badge/Recharts-2-22B5BF?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

> Personal expense tracker with category filters, monthly summaries, budget alerts, and interactive charts.

## Features

- **Add / Edit / Delete** expenses with category, amount, date, and notes
- **Interactive Charts** — pie chart by category, bar chart by month (Recharts)
- **Budget Alerts** — set monthly limits per category, get warned when exceeded
- **Filters** — by category, date range, and amount
- **Persistent State** — localStorage sync via Redux middleware
- **TypeScript** — fully typed throughout
- **Responsive** — mobile-first CSS Modules layout

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI | React 18, TypeScript |
| State | Redux Toolkit, Redux Persist |
| Charts | Recharts |
| Styling | CSS Modules |
| Build | Vite |
| Testing | Jest, React Testing Library |

## Project Structure

```
src/
├── components/
│   ├── ExpenseForm/
│   ├── ExpenseList/
│   ├── ExpenseChart/
│   └── BudgetAlert/
├── store/
│   ├── index.ts
│   └── slices/
│       ├── expenseSlice.ts
│       └── budgetSlice.ts
├── hooks/
│   ├── useExpenses.ts
│   └── useBudget.ts
├── types/
│   └── expense.ts
└── App.tsx
```

## Getting Started

```bash
npm install
npm run dev
npm test
```

## License

MIT © [Rahul Karnavathula](https://github.com/rahulkannavathula)
