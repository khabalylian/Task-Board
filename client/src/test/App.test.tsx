import { render, screen, fireEvent } from '@testing-library/react';
import { ICard, IListTodo } from '../slice/interfaceSlice';
import { Provider } from 'react-redux';
import store from '../store/store';
import TodoCard from '../components/TodoCard/TodoCard';

let listId: string = '', 
	cardId: number = 0;

describe('All test', async () => {

	it('Should create list', async () => {
		const response = await fetch(`${import.meta.env.VITE_LINK}/list`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({name: '111111'}),
		});

		const data: IListTodo = await response.json()
		listId = data.id;
		expect(data).toHaveProperty('id');
	});

	it('Checking for adding an card to the list', async () => {

		const response = await fetch(`http:/localhost:3001/card/${listId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				description: 'gdfg',
				priority: 'Low',
				time: 'Sat, May 4',
				title: 'gfd',
			}),
		});

		const data: ICard = await response.json();

		cardId = data.id

		expect(data).toHaveProperty('description');
		expect(data).toHaveProperty('time');
		expect(data).toHaveProperty('priority');
	});

	it('Should return lists, not be empty array', async () => {
		const response = await fetch(`http:/localhost:3001/list`);

		const data: ICard = await response.json();

		expect(data).not.toHaveLength(0);
	});

	it('Should edit card', async () => {
		const response = await fetch(`http:/localhost:3001/card/${cardId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({title: 'Hello'}),
		});

		const data: ICard = await response.json();

		expect(data).toHaveProperty('title');
		expect(data.title).toBe('Hello');
	});

	it('Should delete card', async () => {

		const response = await fetch(`http:/localhost:3001/card/${cardId}`, {
			method: 'DELETE',
		});

		const data = await response.json();

		expect(data).toHaveProperty('affected');
		expect(data.affected).not.toBe(0);
	});

	it('Should delete list', async () => {

		const response = await fetch(`${import.meta.env.VITE_LINK}/list/${listId}`, {
			method: 'DELETE',
		});

		const data = await response.json();

		expect(data).toHaveProperty('affected');
		expect(data.affected).not.toBe(0);
	});

	it('Should open popup option', async () => {
		
		render(
			<Provider store={store}>
				<TodoCard id={0} title={''} description={''} time={''} priority={''} idList={''} name={''}/>
			</Provider>
		)
		fireEvent.click(screen.getByRole('button'));

		expect(screen.getByTestId('popup')).toBeInTheDocument();
	});
	
})