import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hook';
import TodoCard from '../TodoCard/TodoCard';
import TodoListItem from '../TodoListItem/TodoListItem';
import styles from './TodoList.module.css';
import ModalComp from '../Modal/Modal';
import { getAllTodo } from '../../slice/TodoList';
import { IListCard } from '../../slice/interfaceSlice';
import { creatTodoCard} from '../../slice/TodoCard';

const TodoList: React.FC = () => {
	const [idCards, setIdCard] = useState<string>('');
	const [open, setOpen] = useState(false);
	const [values, setValues] = useState<Partial<IListCard>>({ priority: 'Low' });

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const { todoList } = useAppSelector((state) => state.todoList);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getAllTodo());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getIdCard = (id: string) => {
		setIdCard(id);
	};
	
	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		if (name === 'time') {
			const date = new Date(value);
			const changeTime = new Intl.DateTimeFormat('en-US', {
				weekday: 'short',
				day: 'numeric',
				month: 'short',
			}).format(date);

			setValues((prevValues) => ({
				...prevValues,
				[name]: changeTime,
			}));

			return;
		}
		setValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		await dispatch(creatTodoCard({ id: idCards, cardValue: values}));
		await dispatch(getAllTodo());

		setValues({ priority: 'Low' });
		handleClose();
	};

	return (
		<div className={styles.todoList}>
			{todoList &&
				todoList.map((todoHeader) => (
					<div key={todoHeader.id} className={styles.todoListItem}>
						<TodoListItem {...todoHeader} />
						<button
							className={styles.addCard}
							onClick={() => {
								handleOpen();
								getIdCard(todoHeader.id);
							}}
						>
							+ Add new card
						</button>
						<div className={styles.todoCardList}>
							{todoHeader.card.map((todoCard) => (
								<TodoCard
									key={todoCard.id}
									{...todoCard}
									idList={todoHeader.id}
									name={todoHeader.name}
								/>
							))}
						</div>
					</div>
				))}
			<ModalComp
				open={open}
				handleChange={handleChange}
				handleOpen={handleOpen}
				handleClose={handleClose}
				handleSubmit={handleSubmit}
				cardValue={{priority: values.priority}}
			/>
		</div>
	);
};

export default TodoList;
