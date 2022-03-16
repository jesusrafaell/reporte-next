export const validPass = (password: string, password2: string) => {
	let errorPass = {
		rango: false,
		mayus: false,
		minus: false,
		sig: false,
		samePass: false,
	};

	if (password.length < 8 || password.length > 12) errorPass.rango = true;

	//Tenga 1 Mayuscula
	if (!/([A-Z]+)/g.test(password)) errorPass.mayus = true;

	//Al menos una minuscula
	if (!/([a-z]+)/g.test(password)) errorPass.minus = true;

	//Al menos un signo
	if (!/[^a-z0-9\x20]/i.test(password)) errorPass.sig = true;

	//Same password
	if (password !== password2) errorPass.samePass = true;

	return errorPass;
};

export const validEmail = (email: string): boolean => {
	const validatedEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(email as string);
	if (!validatedEmail) return true;
	else return false;
};

export const validIdentNum = (value: string): boolean => {
	if (value.length > 6 && /^([0-9])+$/.test(value)) return false;
	else return true;
};
