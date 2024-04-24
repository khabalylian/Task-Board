import styles from './TodoCard.module.css';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import cn from 'classnames';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook';
import ModalComp from '../Modal/Modal';
import InfoTask from '../InfoTask/InfoTask';
import { transformTime } from '../../helpers/transformTime';
import { ICard, IListCard } from '../../slice/interfaceSlice';
import { deleteTodoCard, editCard, moveCard } from '../../slice/TodoCard';
import { addHistoryCard } from '../../slice/TodoHistory';
import { closeModal } from '../../helpers/closeModal';
import { getAllTodo } from '../../slice/TodoList';
import Button from '../../helpers/components/Button';

const TodoCard: React.FC<ICard & { idList: string; name: string }> = ({
	id,
	title,
	description,
	time,
	priority,
	name,
}) => {
	const [anchor, setAnchor] = useState<null | HTMLElement>(null);
	const [open, setOpen] = useState<boolean>(false);
	const [openModal, setOpenModal] = useState(false);
	const [openModalInfo, setOpenModalInfo] = useState(false);
	const [values, setValues] = useState<Partial<IListCard>>({ priority: 'Low' });

	const handleOpen = () => setOpenModal(true);
	const handleClose = () => setOpenModal(false);
	const handleOpenInfo = () => setOpenModalInfo(true);
	const handleCloseInfo = () => setOpenModalInfo(false);

	const todoList = useAppSelector((state) => state.todoList.todoList);
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
		await dispatch(editCard({id, editValue: values}));
		await dispatch(getAllTodo());
		setValues({ priority: 'Low' });
		handleClose()	
	};

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

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchor(anchor ? null : event.currentTarget);
		setOpen((open) => !open);
	};

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
		setOpen((open) => !open);
	};

	return (
		<div className={styles.todoCard}>
			<div className={styles.content} onClick={handleOpenInfo}>
				<h2 className={styles.title}>{title}</h2>
				<p className={styles.descr}>{description}</p>
				<div className={styles.timeStamp}>
					<svg
						width={24}
						height={24}
						id="Layer_1"
						version="1.1"
						viewBox="0 0 100.353 100.353"
						xmlSpace="preserve"
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
					>
						<g>
							<path d="M32.286,42.441h-9.762c-0.829,0-1.5,0.671-1.5,1.5v9.762c0,0.828,0.671,1.5,1.5,1.5h9.762c0.829,0,1.5-0.672,1.5-1.5   v-9.762C33.786,43.113,33.115,42.441,32.286,42.441z M30.786,52.203h-6.762v-6.762h6.762V52.203z" />
							<path d="M55.054,42.441h-9.762c-0.829,0-1.5,0.671-1.5,1.5v9.762c0,0.828,0.671,1.5,1.5,1.5h9.762c0.828,0,1.5-0.672,1.5-1.5   v-9.762C56.554,43.113,55.882,42.441,55.054,42.441z M53.554,52.203h-6.762v-6.762h6.762V52.203z" />
							<path d="M77.12,42.441h-9.762c-0.828,0-1.5,0.671-1.5,1.5v9.762c0,0.828,0.672,1.5,1.5,1.5h9.762c0.828,0,1.5-0.672,1.5-1.5v-9.762   C78.62,43.113,77.948,42.441,77.12,42.441z M75.62,52.203h-6.762v-6.762h6.762V52.203z" />
							<path d="M32.286,64.677h-9.762c-0.829,0-1.5,0.672-1.5,1.5v9.762c0,0.828,0.671,1.5,1.5,1.5h9.762c0.829,0,1.5-0.672,1.5-1.5   v-9.762C33.786,65.349,33.115,64.677,32.286,64.677z M30.786,74.439h-6.762v-6.762h6.762V74.439z" />
							<path d="M55.054,64.677h-9.762c-0.829,0-1.5,0.672-1.5,1.5v9.762c0,0.828,0.671,1.5,1.5,1.5h9.762c0.828,0,1.5-0.672,1.5-1.5   v-9.762C56.554,65.349,55.882,64.677,55.054,64.677z M53.554,74.439h-6.762v-6.762h6.762V74.439z" />
							<path d="M77.12,64.677h-9.762c-0.828,0-1.5,0.672-1.5,1.5v9.762c0,0.828,0.672,1.5,1.5,1.5h9.762c0.828,0,1.5-0.672,1.5-1.5v-9.762   C78.62,65.349,77.948,64.677,77.12,64.677z M75.62,74.439h-6.762v-6.762h6.762V74.439z" />
							<path d="M89,13.394h-9.907c-0.013,0-0.024,0.003-0.037,0.004V11.4c0-3.268-2.658-5.926-5.926-5.926s-5.926,2.659-5.926,5.926v1.994   H56.041V11.4c0-3.268-2.658-5.926-5.926-5.926s-5.926,2.659-5.926,5.926v1.994H33.025V11.4c0-3.268-2.658-5.926-5.926-5.926   s-5.926,2.659-5.926,5.926v1.995c-0.005,0-0.01-0.001-0.015-0.001h-9.905c-0.829,0-1.5,0.671-1.5,1.5V92.64   c0,0.828,0.671,1.5,1.5,1.5H89c0.828,0,1.5-0.672,1.5-1.5V14.894C90.5,14.065,89.828,13.394,89,13.394z M70.204,11.4   c0-1.614,1.312-2.926,2.926-2.926s2.926,1.312,2.926,2.926v8.277c0,1.613-1.312,2.926-2.926,2.926s-2.926-1.312-2.926-2.926V11.4z    M50.115,8.474c1.613,0,2.926,1.312,2.926,2.926v8.277c0,1.613-1.312,2.926-2.926,2.926c-1.614,0-2.926-1.312-2.926-2.926v-4.643   c0.004-0.047,0.014-0.092,0.014-0.141s-0.01-0.094-0.014-0.141V11.4C47.189,9.786,48.501,8.474,50.115,8.474z M24.173,11.4   c0-1.614,1.312-2.926,2.926-2.926c1.613,0,2.926,1.312,2.926,2.926v8.277c0,1.613-1.312,2.926-2.926,2.926   c-1.614,0-2.926-1.312-2.926-2.926V11.4z M87.5,91.14H12.753V16.394h8.405c0.005,0,0.01-0.001,0.015-0.001v3.285   c0,3.268,2.659,5.926,5.926,5.926s5.926-2.658,5.926-5.926v-3.283h11.164v3.283c0,3.268,2.659,5.926,5.926,5.926   s5.926-2.658,5.926-5.926v-3.283h11.163v3.283c0,3.268,2.658,5.926,5.926,5.926s5.926-2.658,5.926-5.926V16.39   c0.013,0,0.024,0.004,0.037,0.004H87.5V91.14z" />
						</g>
					</svg>
					<span>{time}</span>
				</div>
				<div className={styles.priority}>
					<span
						className={cn(styles.dot, {
							[styles.low]: priority === 'Low',
							[styles.medium]: priority === 'Medium',
							[styles.high]: priority === 'High',
						})}
					></span>
					{priority}
				</div>
			</div>
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
			<Button
				handleClick={handleClick}
				className={styles.option}
				ref={refButton}
			/>
			<BasePopup open={open} anchor={anchor} placement="bottom-start">
				<div className={styles.listPopup} ref={refPopup}>
					<button
						className={styles.edit}
						onClick={() => {
							handleOpen(), setOpen((open) => !open);
						}}
					>
						Edit
					</button>
					<button className={styles.delete} onClick={deleteCardTodo}>
						Delete
					</button>
				</div>
			</BasePopup>
			<ModalComp
				handleSubmit={handleSubmit}
				open={openModal}
				handleOpen={handleOpen}
				handleClose={handleClose}
				handleChange={handleChange}
				cardValue={{ title, description, id, priority, time }}
			/>
			<InfoTask
				card={{ priority, title, description, time }}
				name={name}
				id={id}
				isOpen={openModalInfo}
				handleOpenInfo={handleOpenInfo}
				handleCloseInfo={handleCloseInfo}
			/>
		</div>
	);
};

export default TodoCard;
