import { useState, useReducer } from "react";
import "./App.css";

interface ICounterState {
  counter: number;
}

type CounterAction =
  | { type: "Increase" }
  | { type: "Decrease" }
  | { type: "Reset" };

const counterInitial: ICounterState = { counter: 0 };

function counterReducer(state: ICounterState, action: CounterAction): ICounterState {
  switch (action.type) {
    case "Increase":
      return { counter: state.counter + 1 };
    case "Decrease":
      return { counter: state.counter - 1 };
    case "Reset":
      return counterInitial;
    default:
      return state;
  }
}

function UseStateCounter() {
  const [count, setCount] = useState(0);
  return (
    <div className="state-card">
      <div className="card-header">
        <h2 className="badge-title">useState</h2>
        <p className="counter-value">{count}</p>
      </div>
      <div className="btn-group-row">
        <button className="btn-primary" onClick={() => setCount((prev) => prev + 1)}>
          Increase
        </button>
      </div>
    </div>
  );
}

function UseReducerCounter() {
  const [state, dispatch] = useReducer(counterReducer, counterInitial);
  return (
    <div className="state-card">
      <div className="card-header">
        <h2 className="badge-title">useReducer</h2>
        <p className="counter-value">{state.counter}</p>
      </div>
      <div className="btn-group-row">
        <button className="btn-primary" onClick={() => dispatch({ type: "Increase" })}>
          ＋
        </button>
        <button className="btn-secondary" onClick={() => dispatch({ type: "Decrease" })}>
          －
        </button>
        <button className="btn-danger" onClick={() => dispatch({ type: "Reset" })}>
          Reset
        </button>
      </div>
    </div>
  );
}

interface ICompanyState {
  department: string;
  error: string | null;
}

type CompanyAction =
  | { type: "CHANGE_DEPARTMENT"; payload: string }
  | { type: "SET_ERROR"; payload: string };

const companyInitial: ICompanyState = {
  department: "Software Developer",
  error: null,
};

function companyReducer(state: ICompanyState, action: CompanyAction): ICompanyState {
  switch (action.type) {
    case "CHANGE_DEPARTMENT":
      return { department: action.payload, error: null };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

function UseReducerCompany() {
  const [state, dispatch] = useReducer(companyReducer, companyInitial);
  const [input, setInput] = useState("");

  const handleChange = () => {
    if (input.trim() === "") return;
    if (input !== "카드메이커") {
      dispatch({ type: "SET_ERROR", payload: "Sorry. selected department is not available." });
    } else {
      dispatch({ type: "CHANGE_DEPARTMENT", payload: input });
    }
    setInput("");
  };

  return (
    <div className="company-card">
      <div className="company-info">
        <h2 className="company-title">{state.department}</h2>
        {state.error && <p className="error-badge">{state.error}</p>}
      </div>
      <div className="form-group">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleChange()}
          placeholder="Update department"
          className="custom-input"
        />
        <button className="btn-primary flex-shrink-0" onClick={handleChange}>
          직무 변경
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <main className="main-container">
      <div className="content-wrapper">
        <section className="dashboard-section">
          <h1 className="section-label">카운터 예제</h1>
          <div className="grid-layout">
            <UseStateCounter />
            <UseReducerCounter />
          </div>
        </section>

        <section className="dashboard-section">
          <h1 className="section-label">회사 직무 예제</h1>
          <UseReducerCompany />
        </section>
      </div>
    </main>
  );
}