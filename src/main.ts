

import './scss/styles.scss';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';
import { WebLarekApi } from './components/Api/WebLarekApi';

import { apiProducts } from './utils/data';
import { ProductCatalog } from './components/Models/ProductCatalog';
import { Basket } from './components/Models/Basket';
import { Buyer } from './components/Models/Buyer';

// Создаём экземпляры всех трёх моделей
const productCatalog = new ProductCatalog();
const basket = new Basket();
const buyer = new Buyer();

// Получаем товары для тестирования
const firstProduct = apiProducts.items[0];
const secondProduct = apiProducts.items[1];

// =====================================
// Проверка модели каталога товаров
// =====================================

productCatalog.setProducts(apiProducts.items);

console.log(
	'Массив товаров из каталога:',
	productCatalog.getProducts()
);

if (firstProduct) {
	console.log(
		'Товар, найденный по id:',
		productCatalog.getProductById(firstProduct.id)
	);

	productCatalog.setSelectedProduct(firstProduct);

	console.log(
		'Товар для подробного отображения:',
		productCatalog.getSelectedProduct()
	);
}

// =====================================
// Проверка модели корзины
// =====================================

console.log(
	'Корзина после создания:',
	basket.getProducts()
);

if (firstProduct) {
	basket.addProduct(firstProduct);

	console.log(
		'Корзина после добавления первого товара:',
		basket.getProducts()
	);

	console.log(
		'Есть ли первый товар в корзине:',
		basket.hasProduct(firstProduct.id)
	);

	console.log(
		'Количество товаров в корзине:',
		basket.getCount()
	);

	console.log(
		'Стоимость товаров в корзине:',
		basket.getTotal()
	);
}

if (secondProduct) {
	basket.addProduct(secondProduct);

	console.log(
		'Корзина после добавления второго товара:',
		basket.getProducts()
	);

	console.log(
		'Количество товаров после добавления второго товара:',
		basket.getCount()
	);

	console.log(
		'Общая стоимость двух товаров:',
		basket.getTotal()
	);
}

if (firstProduct) {
	basket.removeProduct(firstProduct);

	console.log(
		'Корзина после удаления первого товара:',
		basket.getProducts()
	);

	console.log(
		'Есть ли первый товар после удаления:',
		basket.hasProduct(firstProduct.id)
	);
}

basket.clear();

console.log(
	'Корзина после полной очистки:',
	basket.getProducts()
);

console.log(
	'Количество товаров после очистки:',
	basket.getCount()
);

console.log(
	'Стоимость товаров после очистки:',
	basket.getTotal()
);

// =====================================
// Проверка модели покупателя
// =====================================

console.log(
	'Данные покупателя после создания:',
	buyer.getData()
);

console.log(
	'Ошибки до заполнения данных:',
	buyer.validate()
);

buyer.setData({
	payment: 'card',
	address: 'Москва, улица Пушкина, дом 10'
});

console.log(
	'Данные после заполнения оплаты и адреса:',
	buyer.getData()
);

console.log(
	'Ошибки после заполнения оплаты и адреса:',
	buyer.validate()
);

buyer.setData({
	email: 'user@example.com',
	phone: '+7 999 123-45-67'
});

console.log(
	'Все заполненные данные покупателя:',
	buyer.getData()
);

console.log(
	'Ошибки после заполнения всех данных:',
	buyer.validate()
);

buyer.clear();

console.log(
	'Данные покупателя после очистки:',
	buyer.getData()
);

console.log(
	'Ошибки после очистки данных:',
	buyer.validate()
);

// =====================================
// Проверка получения товаров с сервера
// =====================================

const api = new Api(API_URL);
const webLarekApi = new WebLarekApi(api);

webLarekApi
	.getProducts()
	.then((response) => {
		productCatalog.setProducts(response.items);

		console.log(
			'Каталог товаров, полученный с сервера:',
			productCatalog.getProducts()
		);
	})
	.catch((error) => {
		console.error(
			'Ошибка получения товаров с сервера:',
			error
		);
	});