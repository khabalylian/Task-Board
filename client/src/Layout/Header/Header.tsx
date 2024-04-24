import { ChangeEvent, useState } from 'react';
import styles from './Header.module.css';

import { useAppDispatch } from '../../hook';
import HistoryTodo from '../../components/HistoryTodo/HistoryTodo';
import { createList } from '../../slice/TodoList';
const Header: React.FC = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [name, setName] = useState<string>('');
	const [openModal, setOpenModal] = useState<boolean>(false);

	const handleOpenInfo = () => setOpenModal(true);
	const handleCloseInfo = () => setOpenModal(false);

	const dispatch = useAppDispatch();

	const handleClick = () => {
		setOpen(!open);
	};

	const addTodo = async () => {
		await dispatch(createList({ name }));
		setName('');
		setOpen(!open);
	};

	const setValue = (event: ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	return (
		<header className={styles.header}>
			<h1 className={styles.logo}>My task Board</h1>
			<div className={styles.sideOption}>
				<button className={styles.history} onClick={handleOpenInfo}>
					History
				</button>
				{!open ? (
					<button className={styles.btnAdd} onClick={handleClick}>
						+ Create new list
					</button>
				) : (
					<input
						onBlur={addTodo}
						onChange={setValue}
						className={styles.input}
						type="text"
						placeholder="Введіть назву списку"
						autoFocus
					/>
				)}
			</div>
			<HistoryTodo
				isOpen={openModal}
				handleCloseInfo={handleCloseInfo}
				handleOpenInfo={handleOpenInfo}
			/>
		</header>
	);
};

export default Header;
