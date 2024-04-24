import { ChangeEvent, FormEvent} from 'react';
import styles from './Modal.module.css';
import Modal from 'react-modal';
import { transformStringToDate } from '../../helpers/transformTime';
import { ICard } from '../../slice/interfaceSlice';

interface IModal {
	open: boolean;
	handleOpen: () => void;
	handleClose: () => void;
	handleChange: (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
	) => void;
	handleSubmit: (e: FormEvent) => void;
	cardValue?: Partial<ICard>;
}

const DATE = new Date().toISOString().slice(0, 16);

const ModalComp: React.FC<IModal> = ({
	open,
	handleOpen,
	handleClose,
	handleChange,
	cardValue,
	handleSubmit
}) => {
	return (
		<Modal
			className={styles.modal}
			isOpen={open}
			onAfterOpen={handleOpen}
			onRequestClose={handleClose}
			contentLabel="Example Modal"
			ariaHideApp={false}
		>
			<form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
				<input
					className={styles.input}
					type="text"
					name="title"
					placeholder="Заголовок"
					defaultValue={cardValue?.title}
					onChange={handleChange}
				/>
				<textarea
					className={styles.input}
					placeholder="Опис"
					name="description"
					defaultValue={cardValue?.description}
					onChange={handleChange}
				/>
				<input
					className={styles.input}
					type="datetime-local"
					min={DATE}
					name="time"
					defaultValue={
						cardValue?.time
							? transformStringToDate(cardValue?.time)
							: cardValue?.time
					}
					onChange={handleChange}
				/>
				<select
					name="priority"
					defaultValue={cardValue?.priority}
					onChange={handleChange}
				>
					<option value="Виберіть пріоритет" disabled>
						Виберіть пріоритет
					</option>
					<option value="Low">Low</option>
					<option value="Medium">Medium</option>
					<option value="High">High</option>
				</select>
				<button className={styles.submit} name="button" type="submit">
					Підтвердити
				</button>
			</form>
		</Modal>
	);
};

export default ModalComp;
