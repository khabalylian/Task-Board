import {
	ChangeEvent,
	FC,
	FormEvent,
	useContext,
} from 'react';
import { TodoContext } from './TodoCardWrapper';
import ModalComp from '../Modal/Modal';
import { editCard } from '../../slice/TodoCard';
import { getAllTodo } from '../../slice/TodoList';
import { useAppDispatch } from '../../hook';
import { ICard } from '../../slice/interfaceSlice';

interface ITodoCardModal {
	card: ICard
}

export const TodoCardModal: FC<ITodoCardModal> = ({
	card: {id, title, description, time, priority}
}) => {
	const { openModal, handleOpen, handleClose, setValues, values } = useContext(TodoContext);

	const dispatch = useAppDispatch();

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
		await dispatch(editCard({ id, editValue: values }));
		await dispatch(getAllTodo());
		setValues({ priority: 'Low' });
		handleClose();
	};

	return (
		<ModalComp
			handleSubmit={handleSubmit}
			open={openModal}
			handleOpen={handleOpen}
			handleClose={handleClose}
			handleChange={handleChange}
			cardValue={{ title, description, id, priority, time }}
		/>
	);
};
