import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICard, IHistory, IHistoryGet } from './interfaceSlice';

interface IState {
	loading: boolean;
	history: IHistoryGet[];
}

const initialState: IState = {
	loading: true,
	history: [],
};

export const addHistoryCard = createAsyncThunk<
	ICard,
	{ id?: number; historyValue: IHistory }
>('todods/addHistory', async function ({ id, historyValue }) {
	const url = `${import.meta.env.VITE_LINK}/history`;
	const response = await fetch(`${url}${id ? `/${id}` : ''}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(historyValue),
	});

	const data = await response.json();

	return data;
});

export const getHistoryCard = createAsyncThunk<IHistoryGet[], { id: number }>(
	'todods/getHistory',
	async function ({ id }) {
		const response = await fetch(
			`${import.meta.env.VITE_LINK}/historyCard/${id}`,
		);

		const data = await response.json();

		return data;
	},
);

export const getAllHistoryCard = createAsyncThunk<IHistoryGet[]>(
	'todods/getAllHistory',
	async function () {
		const response = await fetch(`${import.meta.env.VITE_LINK}/history`);

		const data = await response.json();

		return data;
	},
);

const todoHistorySlice = createSlice({
	name: 'todoHistory',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAllHistoryCard.fulfilled, (state, action) => {
			state.loading = false;
			state.history = action.payload;
		});
	},
});

export default todoHistorySlice.reducer;
