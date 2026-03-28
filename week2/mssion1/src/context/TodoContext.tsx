import { createContext, useContext, useState, type ReactNode } from "react";

type TodoContextType = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  todos: string[];
  doneTodos: string[];
  addTodo: () => void;
  completeTodo: (index: number) => void;
  deleteDoneTodo: (index: number) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [input, setInput] = useState<string>("");
  const [todos, setTodos] = useState<string[]>([]);
  const [doneTodos, setDoneTodos] = useState<string[]>([]);

  const addTodo = () => {
    const text = input.trim();
    if (text === "") return;

    setTodos([...todos, text]);
    setInput("");
  };

  const completeTodo = (index: number) => {
    const completed = todos[index];
    const newTodos = todos.filter((_, i) => i !== index);

    setTodos(newTodos);
    setDoneTodos([...doneTodos, completed]);
  };

  const deleteDoneTodo = (index: number) => {
    const newDoneTodos = doneTodos.filter((_, i) => i !== index);
    setDoneTodos(newDoneTodos);
  };

  return (
    <TodoContext.Provider
      value={{
        input,
        setInput,
        todos,
        doneTodos,
        addTodo,
        completeTodo,
        deleteDoneTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within TodoProvider");
  }
  return context;
}