import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { transformTime } from '../helpers/transformTime';
import { ICard, IListCard} from './interfaceSlice';
import { addHistoryCard } from './TodoHistory';
import { getAllTodo, initialState } from './TodoList';

export const creatTodoCard = createAsyncThunk<
	ICard,
	{ id: string; cardValue: Partial<IListCard> }
>('todos/creatCard', async function ({ id, cardValue }, { dispatch }) {
	const response = await fetch(`${import.meta.env.VITE_LINK}/card/${id}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(cardValue),
	});

	const data: ICard = await response.json();

	dispatch(
		addHistoryCard({
			id: data.id,
			historyValue: {
				text: `Ви створили картку з назвою ${cardValue.title || '(без назви)'}`,
				time: transformTime(),
			},
		}),
	);

	dispatch(getAllTodo());

	return data;
});

export const deleteTodoCard = createAsyncThunk(
	'todods/deleteCard',
	async function (id: number, { dispatch }) {
		const response = await fetch(`${import.meta.env.VITE_LINK}/card/${id}`, {
			method: 'DELETE',
		});

		await dispatch(getAllTodo());

		console.log(await response.json())

		return await response.json();
	},
);

export const editCard = createAsyncThunk(
	'todods/editCard',
	async function (
		{ id, editValue }: { id: number; editValue: Partial<IListCard>},
		{ dispatch },
	) {
		const response = await fetch(`${import.meta.env.VITE_LINK}/card/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(editValue),
		});

		const data = await response.json();

		const oldValue = JSON.parse(data.oldValue);

		const editText = `
  		${
				oldValue.title || oldValue.title === ''
					? `title: ${
							oldValue.title.length > 20
								? oldValue.title.slice(0, 20) + '...'
								: oldValue.title
					} ==> ${
							data.title.length > 20
								? data.title.slice(0, 20) + '...'
								: data.title
					}`
					: ''
			}
		${
			oldValue.description
				? `description: ${oldValue.description} ==> ${data.description}`
				: ''
		}
		${
			oldValue.priority
				? `priority: ${oldValue.priority} ==> ${data.priority}`
				: ''
		}
			${oldValue.time ? `time: ${oldValue.time} ==> ${data.time}` : ''}
		`;

		dispatch(
			addHistoryCard({
				historyValue: {
					text: `Змінили такі поля картки:  ${editText}`,
					time: transformTime(),
				},
				id,
			}),
		);

		return data;
	},
);

export const moveCard = createAsyncThunk(
	'todods/moveCard',
	async function (value: { idListToMove?: string; card: ICard }, { dispatch }) {
		await fetch(`${import.meta.env.VITE_LINK}/moveTo`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(value),
		});

		await dispatch(getAllTodo());
	},
);

export const getCard = createAsyncThunk(
	'todods/getCard',
	async function (id: string, { dispatch }) {
		const response = await fetch(`${import.meta.env.VITE_LINK}/card/${id}`);

		dispatch(getAllTodo());

		return await response.json();
	},
);

const todoCardSlice = createSlice({
	name: 'todoCard',
	initialState: initialState,
	reducers: {},
});

export default todoCardSlice.reducer;
