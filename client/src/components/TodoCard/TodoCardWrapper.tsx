import {  ComponentPropsWithoutRef, FC, createContext, useState, SetStateAction, Dispatch} from 'react'
import styles from './TodoCard.module.css'
import { TodoContent } from './TodoContent'
import { IListCard } from '../../slice/interfaceSlice';
import cn from 'classnames'
import { TodoCardSelect } from './TodoCardSelect';
import { TodoCardPopup } from './TodoCardPopup';
import { TodoCardButton } from './TodoCardButton';
import { TodoCardModal } from './TodoCardModal';

interface ITodoContext {
	anchor: null | HTMLElement;
	open: boolean;
	openModal: boolean;
	values: Partial<IListCard>;
	handleOpen: () => void;
	handleClose: () => void;
	handleSetAnchor: (anchor: null | HTMLElement) => void;
	setValues: Dispatch<SetStateAction<Partial<IListCard>>>;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

interface ITodoCardWrapper extends ComponentPropsWithoutRef<"div"> {}


export const TodoContext = createContext<ITodoContext>(null!);


const TodoCardWrapper: FC<ITodoCardWrapper> = ({children, className, ...rest}) => {

	const [anchor, setAnchor] = useState<null | HTMLElement>(null);
	const [open, setOpen] = useState<boolean>(false);
	const [openModal, setOpenModal] = useState(false);
	const [values, setValues] = useState<Partial<IListCard>>({ priority: 'Low' });

	const handleOpen = () => setOpenModal(true);
	const handleClose = () => setOpenModal(false);
	const handleSetAnchor = (anchor: null | HTMLElement) => setAnchor(anchor);

	return (
		<TodoContext.Provider
			value={{
				anchor,
				open,
				openModal,
				values,
				handleOpen,
				handleClose,
				handleSetAnchor,
				setValues,
				setOpen,
			}}
		>
			<div className={cn(styles.todoCard, className)} {...rest}>
				{children}
			</div>
		</TodoContext.Provider>
	);
};

const TodoCardMain = Object.assign(TodoCardWrapper, {
	Content: TodoContent,
	Select: TodoCardSelect,
	Popup: TodoCardPopup,
	Button: TodoCardButton,
	Modal: TodoCardModal
})

export default TodoCardMain;