import { configureStore } from '@reduxjs/toolkit';
import TodoCard from '../slice/TodoCard';
import TodoHistory from '../slice/TodoHistory';
import TodoList from '../slice/TodoList';

const store = configureStore({
  reducer: {
    todoList: TodoList,
    todoCard: TodoCard,
    todoHistory: TodoHistory,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
