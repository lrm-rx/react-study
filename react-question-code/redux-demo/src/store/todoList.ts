import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import produce from "immer";

export type TodoItemType = {
  id: string;
  title: string;
  completed: boolean;
};

const INIT_STATE: TodoItemType[] = [
  { id: nanoid(5), title: "打游戏", completed: false },
  { id: nanoid(5), title: "打代码", completed: false },
];

export const todoListSlice = createSlice({
  name: "todoList",
  initialState: INIT_STATE,
  reducers: {
    // addTodo(state: TodoItemType[], action: PayloadAction<TodoItemType>) {
    //   // return state.concat(action.payload) // 把newTodo添加到list最后一个
    //   return [
    //     action.payload, // 把 newTodo添加到 list 第一个
    //     ...state,
    //   ];
    // },

    // immer
    addTodo: produce(
      (draft: TodoItemType[], action: PayloadAction<TodoItemType>) => {
        // draft.push(action.payload)
        draft.unshift(action.payload);
      }
    ),

    // removeTodo(state: TodoItemType[], action: PayloadAction<{ id: string }>) {
    //   const { id: removeId } = action.payload;
    //   return state.filter((todo) => todo.id !== removeId);
    // },

    // immer
    removeTodo: produce(
      (draft: TodoItemType[], action: PayloadAction<{ id: string }>) => {
        const { id: removeId } = action.payload;
        const index = draft.findIndex((i) => i.id === removeId);
        draft.splice(index, 1); // 删除数组中的某个元素
      }
    ),

    // toggleCompleted(
    //   state: TodoItemType[],
    //   action: PayloadAction<{ id: string }>
    // ) {
    //   const { id: toggleId } = action.payload;
    //   return state.map((todo) => {
    //     const { id, completed } = todo;
    //     if (id !== toggleId) return todo;
    //     return {
    //       ...todo,
    //       completed: !completed,
    //     };
    //   });
    // },

    // immer
    toggleCompleted: produce(
      (draft: TodoItemType[], action: PayloadAction<{ id: string }>) => {
        const { id: toggleId } = action.payload;
        const todo = draft.find((i) => i.id === toggleId);
        if (todo) {
          todo.completed = !todo.completed;
        }
      }
    ),
  },
});

export const { addTodo, removeTodo, toggleCompleted } = todoListSlice.actions;

export default todoListSlice.reducer;
