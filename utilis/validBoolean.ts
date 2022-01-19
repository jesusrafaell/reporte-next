import { FlagInt } from '@/interfaces/auth/interfaces';

export const validArrayBooelan = (data: FlagInt) => {
	return Object.keys(data).find((item) => {
		if (data[item]) return true;
	})
		? true
		: false;
};

export const validArrayBooleanInBoolean = (value: any) => {
	return Object.keys(value).find((res) => {
		if (typeof value[res] === 'object') {
			return Object.keys(value[res]).find((item) => {
				if (value[res][item]) return true;
			});
		}
		if (value[res]) return true;
	})
		? true
		: false;
};
