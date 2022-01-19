import Swal from 'sweetalert2';

export const successLogin = (email: string) => {
	Swal.fire({
		position: 'center',
		icon: 'success',
		title: `Hola, ${email}`,
		showConfirmButton: false,
		timer: 3000,
	});
};

export const successRegister = () => {
	Swal.fire({
		position: 'center',
		icon: 'success',
		title: 'Usuario Registrado',
		showConfirmButton: false,
		timer: 2000,
	});
};

export const sessionExpired = () => {
	Swal.fire({
		position: 'center',
		icon: 'error',
		title: `Su tiempo a expirado`,
		showConfirmButton: false,
		timer: 2000,
	});
};
