import { configureStore } from "@reduxjs/toolkit";
import countReducer from "./count";
import todoListReducer, { TodoItemType } from "./todoList";

export type StateType = {
  count: number;
  todoList: TodoItemType;
};

export default configureStore({
  reducer: {
    count: countReducer,

    todoList: todoListReducer,

    // 扩展其他模块
  },
});
