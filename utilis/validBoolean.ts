import { FlagInt } from 'pages/auth/interfaces';

export const validArrayBooelan = (data: FlagInt) => {
	return Object.keys(data).find((item) => {
		if (data[item]) return true;
	})
		? true
		: false;
};

/*
		const valid: boolean = Object.keys(errorForm).find((res) => {
			if (typeof errorForm[res] === 'object') {
				return Object.keys(errorForm[res]).find((item) => {
					if (errorForm[res][item]) return true;
				});
			}
			if (errorForm[res]) return true;
		})
			? true
			: false;
		*/
