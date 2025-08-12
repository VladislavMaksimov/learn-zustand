import { create, type StateCreator } from "zustand";

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

const toDoSlice: StateCreator<ToDoStore> = (set) => ({
  todos: [],
  addTodo: (title) =>
    set((state) => ({
      todos: [...state.todos, { title, isCompleted: false }],
    })),
  changeIsCompleted: (index, isCompleted) => {
    set((state) => {
      const todos = [...state.todos];
      todos[index].isCompleted = isCompleted;
      return { todos };
    });
  },
});

export const useToDoStore = create<ToDoStore>(toDoSlice);
