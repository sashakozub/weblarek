export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
	get<T extends object>(uri: string): Promise<T>;
	post<T extends object>(
		uri: string,
		data: object,
		method?: ApiPostMethods
	): Promise<T>;
}

// Возможные значения способа оплаты
export type TPayment = 'card' | 'cash' | '';

// Данные товара
export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

// Данные покупателя
export interface IBuyer {
	payment: TPayment;
	email: string;
	phone: string;
	address: string;
}

// Ошибки валидации данных покупателя
export type TBuyerErrors = Partial<Record<keyof IBuyer, string>>;
