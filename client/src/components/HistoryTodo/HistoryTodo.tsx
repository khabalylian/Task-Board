import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook';
import styles from './HistoryTodo.module.css';
import Modal from 'react-modal';
import { getAllHistoryCard } from '../../slice/TodoHistory';

interface IHistoryTodo {
	isOpen: boolean;
	handleOpenInfo: () => void;
	handleCloseInfo: () => void;
}

const HistoryTodo: React.FC<IHistoryTodo> = ({
	isOpen,
	handleCloseInfo,
	handleOpenInfo,
}) => {
	const dispatch = useAppDispatch();
	const history = useAppSelector((state) => state.todoHistory.history);

	useEffect(() => {
		dispatch(getAllHistoryCard());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	return (
		<Modal
			className={styles.history}
			isOpen={isOpen}
			onAfterOpen={handleOpenInfo}
			onRequestClose={handleCloseInfo}
			contentLabel="Example Modal"
			ariaHideApp={false}
		>
			<div className={styles.wrapper}>
				<button className={styles.btn} onClick={handleCloseInfo}>
					⛌
				</button>
				{history.map((history) => (
					<div key={history.id} className={styles.historyCard}>
						<div className={styles.text}>
							<span className={styles.dot}></span>
							<div className={styles.mainText}>{history.text}</div>
						</div>
						<p className={styles.time}>{history.time}</p>
					</div>
				))}
			</div>
		</Modal>
	);
};

export default HistoryTodo;
