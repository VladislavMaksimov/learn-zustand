import { Button, Card, Checkbox, Input } from "antd";
import "./App.css";
import { useToDoStore } from "./model/toDoStore";
import { useState } from "react";

function App() {
  const { todos, addTodo, changeIsCompleted } = useToDoStore();
  const [todoTitle, setTodoTitle] = useState("");
  return (
    <div className="wrapper">
      <Input
        style={{ width: 300 }}
        value={todoTitle}
        onChange={(event) => {
          setTodoTitle(event.target.value);
        }}
      />
      <Button
        onClick={() => {
          if (!todoTitle.trim()) return;
          addTodo(todoTitle);
          setTodoTitle("");
        }}
      >
        Add
      </Button>
      {todos.map((todo, index) => (
        <Card className="card">
          <Checkbox
            checked={todo.isCompleted}
            onChange={(event) => {
              changeIsCompleted(index, event.target.checked);
            }}
          />
          <span>{todo.title}</span>
        </Card>
      ))}
    </div>
  );
}

export default App;
