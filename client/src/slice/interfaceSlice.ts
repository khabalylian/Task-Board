export interface ICard {
	id: number;
	title: string;
	description: string;
	time: string;
	priority: string;
	createAt?: string;
	updateAr?: string;
	listCardId?: string;
}

export interface IListTodo {
	id: string;
	name: string;
	card: ICard[];
	createAt: string;
	updateAr: string;
}

export interface IListCard {
	title: string;
	description: string;
	time: string;
	priority: string;
}

export interface IHistoryGet extends IHistory {
	id: number;
	cardId: number | null;
}

export interface IHistory {
	text: string;
	time: string;
}

export interface IListData {
	name: string;
	id: string;
	card: ICard[];
	createAt: string;
	updateAr: string;
}

export interface IReject {
	status: number;
	error: string;
}
