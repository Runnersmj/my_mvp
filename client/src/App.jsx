import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./components/Home";
import BudgetSummary from "./components/BudgetSummary";
import NewTransaction from "./components/newTransaction";
import TransactionList from "./components/TransactionList";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./styles.css";

export default function App() {
  let [transactions, setTransactions] = useState([]);

  const fetchData = async () => {
    try {
      // communicate with db
      const response = await axios.get("/api/transactions");
      console.log(response);
      // update front end state to reflect db info
      setTransactions(response.data);
    } catch (error) {
      // handle errors
      console.error("Failed to fetch transactions", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // function to add a new transaction
  const addTransaction = async (transaction) => {
    try {
      // communicate with db: add task
      // axios.method(url, data(opt), options(say type of data))
      let response = await axios.post("/api/new-transactions", transaction, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // add it to your state using response data to ensure consistency
      fetchData();
    } catch (error) {
      console.error("Failed to add transaction", error);
    }
  };

  return (
    <>
      {/* Button container with className */}
      <div className="button-container">
        <Link to="/" className="button">
          Home
        </Link>
        <Link to="/budget-summary" className="button">
          Budget Summary
        </Link>
        <Link to="/new-transaction" className="button">
          New Transaction
        </Link>
        <Link to="/transaction-list" className="button">
          Transaction List
        </Link>
      </div>
      {/* Defining Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/budget-summary"
          element={<BudgetSummary transactions={transactions} />}
        />
        <Route
          path="/new-transaction"
          element={<NewTransaction onAddTransaction={addTransaction} />}
        />
        <Route
          path="/transaction-list"
          element={<TransactionList transactions={transactions} />}
        />
      </Routes>
    </>
  );
}
