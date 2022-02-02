export interface Terminal {
	terminal: string;
	afiliado: string;
}

export interface Transaction {
	afiliado: string;
	terminal: string;
	Lote: string | null;
	origen: string;
	pan: string;
	fecha: string;
	referencia: string;
	authoriz: string | null;
	tp_transaction: string;
	monto: string;
}
