import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

type TodoType = {
  title: string;
  isCompleted: boolean;
};

type ToDoState = {
  todos: TodoType[];
};

type ToDoActions = {
  addTodo: (title: string) => void;
  changeIsCompleted: (index: number, isCompleted: boolean) => void;
};

type ToDoStore = ToDoState & ToDoActions;

const toDoSlice: StateCreator<ToDoStore, [["zustand/devtools", never]]> = (
  set,
  get
) => ({
  todos: [],
  addTodo: (title) =>
    set(
      (state) => ({
        todos: [...state.todos, { title, isCompleted: false }],
      }),
      false,
      `add todo: ${title}`
    ),
  changeIsCompleted: (index, isCompleted) => {
    const { todos } = get();
    set(
      (state) => {
        const newTodos = [...state.todos];
        newTodos[index].isCompleted = isCompleted;
        return { todos: newTodos };
      },
      false,
      `change isCompleted: ${todos[index].title} to ${isCompleted}`
    );
  },
});

export const useToDoStore = create<ToDoStore>()(devtools(toDoSlice));
