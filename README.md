# 🚀 FinanceDash UI: Personal Wealth Tracker

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

A high-performance, **React-based** financial management dashboard designed for precision and clarity. This project demonstrates well-structured frontend state management, safe and predictable client-side data handling, and dynamic data visualization.

**Live Demo:** [FinanceDash UI](https://finance-dash-ui-dashboard.vercel.app)

---

## 💎 Key Features

* **Role-Based Access Control (RBAC):** Integrated "Admin" and "Viewer" roles. Admins have full CRUD (Create, Read, Update, Delete) permissions, while Viewers have read-only access to protect data integrity.
* **Smart Insights Engine:** Real-time calculation of **Savings Rate**, **Highest Expense** tracking, and **Total Balance** trends using memoized React logic ($useMemo$) for maximum performance.
* **Hybrid Category System:** A flexible "Combobox" style entry that provides predefined categories (Salary, Food, Rent) while allowing users to input custom categories.
* **Persistent Data Layer:** Uses browser `localStorage` to ensure financial records remain saved even after a page refresh, simulating a database experience without the latency.
* **Responsive Analytics:** Interactive **Balance Trend** lines and **Category Distribution** pie charts that update instantly as transactions are added or filtered.
* **Data Portability:** Built-in **CSV Export** functionality allows users to download their financial reports for external accounting.

---

## 📌 Assignment Alignment

This project was built specifically to address the evaluation requirements:

- **Dashboard Overview:** Summary cards, balance trend chart, and category breakdown
- **Transactions Management:** Search, filtering, hover-based edit/delete (Admin only)
- **Role-Based UI:** Frontend-simulated Admin and Viewer roles
- **Insights Section:** Highest expense, savings rate, and balance trends
- **State Management:** Centralized via React Context with memoized selectors
- **UX Considerations:** Responsive layout, dark mode, and graceful empty states

All data is handled using mock/static data and localStorage, as per assignment guidelines.

---

## 🛠️ Technical Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18 (Vite), Tailwind CSS |
| **Icons** | Lucide-React |
| **State** | React Context API (with $useReducer$ logic patterns) |
| **Charts** | Recharts / Custom SVG Visuals |
| **Deployment** | Vercel |

---

## 🧠 Architectural Highlights

As a developer, I focused on **Clean Code** principles:

* **Atomic Components:** Highly reusable UI elements like `StatCard`, `FormSelect`, and `LegalLayout`.
* **Performance Optimization:** Strategic use of `useMemo` and `useCallback` to prevent unnecessary re-renders during heavy filtering or search operations.
* **Accessible UI:** Dark mode support and a focus on high-contrast typography to ensure the dashboard is readable in any environment.

---

## ⚠️ Assumptions & Limitations

- This is a frontend-only project with no backend or authentication.
- RBAC is simulated on the client side for demonstration purposes.
- Data persistence is handled via localStorage instead of a database.

---

## 📂 Installation & Setup

To get a local copy up and running, follow these simple steps:

1.  **Clone the Repo**
    ```bash
    git clone [https://github.com/sayantan-pachal/FinanceDash-UI-Dashboard.git](https://github.com/sayantan-pachal/FinanceDash-UI-Dashboard.git)
    ```
2.  **Install NPM packages**
    ```bash
    npm install
    ```
3.  **Run the Project**
    ```bash
    npm run dev
    ```

---

## 👤 Contact

**Sayantan Pachal** - **GitHub:** [@sayantan-pachal](https://github.com/sayantan-pachal)  
- **LinkedIn:** [Sayantan Pachal](https://linkedin.com/in/sayantan-pachal)  
- **Portfolio:** [sayantanpachal.vercel.app](https://sayantanpachal.vercel.app)

Project Link: [https://github.com/sayantan-pachal/FinanceDash-UI-Dashboard](https://github.com/sayantan-pachal/FinanceDash-UI-Dashboard)