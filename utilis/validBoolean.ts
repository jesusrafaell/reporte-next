import { FlagInt } from 'pages/auth/interfaces';

export const validArrayBooelan = (data: FlagInt) => {
	return Object.keys(data).find((item) => {
		if (data[item]) return true;
	})
		? true
		: false;
};
