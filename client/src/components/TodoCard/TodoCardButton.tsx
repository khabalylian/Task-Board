import { ButtonHTMLAttributes, DetailedHTMLProps, FC, useContext, useEffect } from 'react';
import { TodoContext } from './TodoCardWrapper';
import { closeModal } from '../../helpers/closeModal';

interface ITodoCardButton
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	refButton: React.RefObject<HTMLButtonElement>;
	refPopup: React.RefObject<HTMLDivElement>;
}

export const TodoCardButton: FC<ITodoCardButton> = ({refButton, refPopup, className, ...props}) => {
	const { setOpen, anchor, handleSetAnchor } = useContext(TodoContext);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		handleSetAnchor(anchor ? null : event.currentTarget);
		setOpen((open) => !open);
	};

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

	return (
		<button
			ref={refButton}
			onClick={handleClick}
			className={className}
			{...props}
		>
			<svg
				width={20}
				height={20}
				enableBackground="new 0 0 32 32"
				id="Glyph"
				version="1.1"
				viewBox="0 0 32 32"
				xmlSpace="preserve"
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
			>
				<path
					d="M13,16c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,14.346,13,16z"
					id="XMLID_294_"
				/>
				<path
					d="M13,26c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,24.346,13,26z"
					id="XMLID_295_"
				/>
				<path
					d="M13,6c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,4.346,13,6z"
					id="XMLID_297_"
				/>
			</svg>
		</button>
	);
};
