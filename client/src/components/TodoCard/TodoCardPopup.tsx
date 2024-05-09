import styles from './TodoCard.module.css';
import { FC, useContext } from 'react';
import { ICard} from '../../slice/interfaceSlice';
import { useAppDispatch } from '../../hook';
import { deleteTodoCard} from '../../slice/TodoCard';
import { transformTime } from '../../helpers/transformTime';
import { addHistoryCard } from '../../slice/TodoHistory';
import { TodoContext } from './TodoCardWrapper';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';

interface ITodoCardPopup {
	card: ICard;
	refPopup: React.RefObject<HTMLDivElement>
}

export const TodoCardPopup: FC<ITodoCardPopup> = ({
	card: { title, id },
	refPopup,
}) => {
	const {anchor, setOpen, handleOpen, open} = useContext(TodoContext);

	const dispatch = useAppDispatch();

	const deleteCardTodo = () => {
		dispatch(
			addHistoryCard({
				historyValue: {
					text: `Видалили картку з назвою ${title}`,
					time: transformTime(),
				},
			}),
		);
		dispatch(deleteTodoCard(id));
		setOpen(!open);
	};

	return (
		<BasePopup
			open={open}
			anchor={anchor}
			placement="bottom-start"
			data-testid="popup"
		>
			<div className={styles.listPopup} ref={refPopup}>
				<button
					className={styles.edit}
					onClick={() => {
						handleOpen(), setOpen(!open);
					}}
				>
					Edit
				</button>
				<button className={styles.delete} onClick={deleteCardTodo}>
					Delete
				</button>
			</div>
		</BasePopup>
	);
};
