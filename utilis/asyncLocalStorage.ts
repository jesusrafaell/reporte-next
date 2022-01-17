//Volviendo Async la function from local Store
//No esta en uso actualmente aqui
export const asyncLocalStorage = {
	setItem: async function (key: string, value: string) {
		await null;
		return localStorage.setItem(key, value);
	},
	getItem: async function (key: string) {
		await null;
		return localStorage.getItem(key);
	},
};
