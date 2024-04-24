import { useEffect, useRef, useState } from 'react';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import styles from './TodoListItem.module.css';

import { useAppDispatch } from '../../hook';
import { transformTime } from '../../helpers/transformTime';
import { IListTodo } from '../../slice/interfaceSlice';
import { addHistoryCard } from '../../slice/TodoHistory';
import { deleteTodoList } from '../../slice/TodoList';
import { closeModal } from '../../helpers/closeModal';

import cn from 'classnames'
import Button from '../../helpers/components/Button';

const TodoListItem: React.FC<IListTodo> = ({ id, name, card }) => {
	const [anchor, setAnchor] = useState<null | HTMLElement>(null);
	const [open, setOpen] = useState<boolean>(false);
	const [showLength, setShowLength] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	const refButton = useRef<HTMLButtonElement>(null);
	const refPopup = useRef<HTMLDivElement>(null);

	useEffect(() => {
		document.addEventListener('mousedown', (e) =>
			closeModal(e, setOpen, refButton, refPopup),
		);

		return () => {
			document.removeEventListener('mousedown', (e) =>
				closeModal(e, setOpen, refButton, refPopup),
			);
		};
	}, []);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchor(anchor ? null : event.currentTarget);
		setOpen((open) => !open);
	};

	const deleteTodo = () => {
		dispatch(
			addHistoryCard({
				historyValue: {
					text: `Видалили списку з назвою ${name}`,
					time: transformTime(),
				},
			}),
		);
		dispatch(deleteTodoList(id));
		setOpen((open) => !open);
	};

	return (
		<div
			className={styles.todoListItem}
			onMouseEnter={() => setShowLength(true)}
			onMouseLeave={() => setShowLength(false)}
		>
			<h2 className={styles.title}>{name}</h2>
			<div className={styles.box}>
				<p
					className={cn(styles.count, {
						[styles.showLength]: showLength,
					})}
				>
					{card.length}
				</p>
				<Button
					className={styles.option}
					handleClick={handleClick}
					ref={refButton}
				/>
			</div>
			<BasePopup open={open} anchor={anchor} placement="bottom-start">
				<div className={styles.listPopup} ref={refPopup}>
					<button className={styles.delete} onClick={deleteTodo}>
						Delete
					</button>
				</div>
			</BasePopup>
		</div>
	);
};

export default TodoListItem;
