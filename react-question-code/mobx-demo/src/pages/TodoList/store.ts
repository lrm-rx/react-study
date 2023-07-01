import { nanoid } from "nanoid";
import {
  makeObservable,
  makeAutoObservable,
  observable,
  action,
  computed,
} from "mobx";

export class ObservableTodoStore {
  id = "";
  task = "";
  completed = false;
  constructor(task: string) {
    // makeObservable(this, {
    //   id: observable,
    //   task: observable,
    //   completed: observable,
    //   rename: action,
    //   toggleCompleted: action,
    // });
    makeAutoObservable(this);

    this.id = nanoid(5);
    this.task = task;
  }

  rename(newName: string) {
    this.task = newName;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }
}

export class ObservableTodoListStore {
  todos: ObservableTodoStore[] = [];

  constructor() {
    makeObservable(this, {
      todos: observable,
      completedTodosCount: computed,
      addTodo: action,
      removeTodo: action,
    });
  }

  get completedTodosCount() {
    return this.todos.filter((t) => t.completed).length;
  }

  addTodo(task: string) {
    const newTodo = new ObservableTodoStore(task);
    this.todos.unshift(newTodo); // 声明式
  }

  removeTodo(id: string) {
    const index = this.todos.findIndex((t) => t.id === id);
    this.todos.splice(index, 1);
  }
}

const store = new ObservableTodoListStore();
export default store;
