import styles from './TodoCard.module.css';
import { ChangeEvent, FC } from 'react';
import { ICard, IListTodo } from '../../slice/interfaceSlice';
import { useAppDispatch } from '../../hook';
import { moveCard } from '../../slice/TodoCard';

interface ITodoCardSelect {
	todoList: IListTodo[];
	card: ICard;
	name: string;
}

export const TodoCardSelect: FC<ITodoCardSelect> = ({ todoList, card: {id, title, description, time, priority}, name }) => {
	const dispatch = useAppDispatch();

	const moveTo = (e: ChangeEvent<HTMLSelectElement>) => {
		const idListToMove = todoList.find((list) => list.name === e.target.value);
		const cards: ICard = {
			id,
			title,
			description,
			time,
			priority,
		};

		dispatch(moveCard({ idListToMove: idListToMove?.id, card: cards }));
	};

	return (
		<select
			name="moveTo"
			className={styles.select}
			defaultValue="move to"
			onChange={moveTo}
		>
			<option value="move to" disabled>
				Move to:
			</option>
			{todoList.map((todoList) => {
				if (todoList.name !== name) {
					return (
						<option key={todoList.id} value={todoList.name}>
							{todoList.name.length > 20
								? todoList.name.slice(0, 20) + '...'
								: todoList.name}
						</option>
					);
				}
			})}
		</select>
	);
};
