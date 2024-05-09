import styles from './TodoCard.module.css';
import {
	useRef,
	useState,
} from 'react';
import { useAppSelector } from '../../hook';
import InfoTask from '../InfoTask/InfoTask';
import { ICard } from '../../slice/interfaceSlice';
import TodoCardMain from './TodoCardWrapper';

const TodoCard: React.FC<ICard & { idList: string; name: string }> = ({
	id,
	title,
	description,
	time,
	priority,
	name,
}) => {
	const [openModalInfo, setOpenModalInfo] = useState(false);

	const handleOpenInfo = () => setOpenModalInfo(true);
	const handleCloseInfo = () => setOpenModalInfo(false);

	const todoList = useAppSelector((state) => state.todoList.todoList);

	const refButton = useRef<HTMLButtonElement>(null);
	const refPopup = useRef<HTMLDivElement>(null);


	return (
		<TodoCardMain>
			<TodoCardMain.Content
				id={id}
				title={title}
				description={description}
				time={time}
				priority={priority}
				handleOpenInfo={handleOpenInfo}
			/>
			<TodoCardMain.Select
				todoList={todoList}
				card={{ title, id, description, time, priority }}
				name={name}
			/>
			<TodoCardMain.Button
				refButton={refButton}
				refPopup={refPopup}
				className={styles.option}
			/>
			<TodoCardMain.Popup
				card={{ title, id, description, time, priority }}
				refPopup={refPopup}
			/>
			<TodoCardMain.Modal card={{ title, id, description, time, priority }} />
			<InfoTask
				card={{ priority, title, description, time }}
				name={name}
				id={id}
				isOpen={openModalInfo}
				handleOpenInfo={handleOpenInfo}
				handleCloseInfo={handleCloseInfo}
			/>
		</TodoCardMain>
	);
};

export default TodoCard;
