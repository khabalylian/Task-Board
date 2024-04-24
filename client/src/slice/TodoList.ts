import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { transformTime } from '../helpers/transformTime';
import { addHistoryCard } from './TodoHistory';
import { IListData, IListTodo, IReject } from './interfaceSlice';

interface IState {
	todoList: IListTodo[];
	errorMessage?: string;
	loading: boolean;
}

export const initialState: IState = {
	todoList: [],
	errorMessage: '',
	loading: true,
};

export const createList = createAsyncThunk<
	IListData,
	{ name: string },
	{ rejectValue: IReject }
>(
	'todos/createList',
	async function (valuePost, { rejectWithValue, dispatch }) {
		const response = await fetch(`${import.meta.env.VITE_LINK}/list`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(valuePost),
		});

		const data = await response.json();

		dispatch(
			addHistoryCard({
				historyValue: {
					text: `Ви створили список з назвою ${valuePost.name}`,
					time: transformTime(),
				},
			}),
		);

		if (!response.ok) {
			return rejectWithValue(data);
		}

		return data;
	},
);

export const getAllTodo = createAsyncThunk<IListTodo[]>(
	'todos/getAllList',
	async function () {
		const response = await fetch(`${import.meta.env.VITE_LINK}/list`);

		const data = await response.json();
		
		return data;
	},
);

export const deleteTodoList = createAsyncThunk<IListTodo[], string>(
	'todos/deleteList',
	async function (id, { dispatch }) {
		const response = await fetch(`${import.meta.env.VITE_LINK}/list/${id}`, {
			method: 'DELETE',
		});

		dispatch(getAllTodo());
		const data = await response.json();

		return data;
	},
);

const todoListSlice = createSlice({
	name: 'todoList',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createList.fulfilled, (state, action) => {
				state.loading = false;
				state.todoList.push(action.payload);
			})
			.addCase(createList.rejected, (state, action) => {
				state.errorMessage = action.payload?.error;
			})
			.addCase(
				getAllTodo.fulfilled,
				(state, action: PayloadAction<IListTodo[]>) => {
					state.loading = false;
					state.todoList = [...action.payload];
				},
			);
	},
});

export default todoListSlice.reducer;
