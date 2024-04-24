import React from 'react';

export function closeModal(e: MouseEvent, setOpen: (state: boolean) => void, ...ref: React.RefObject<HTMLButtonElement | HTMLDivElement>[]) {
	const target = e.target as HTMLButtonElement;

	if (
		ref[0].current &&
		ref[1].current &&
		!ref[0].current.contains(target) &&
		!ref[1].current.contains(target)
	) {
		setOpen(false);
	}
}
