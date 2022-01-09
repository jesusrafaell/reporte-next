export interface FlagInt {
	[key: string]: boolean;
}

export interface errorFlagInt {
	email: boolean;
	password: FlagInt;
	ident_type: boolean;
	ident_num: boolean;
}

export interface UserInt {
	email: string;
	password: string;
	ident_type: number;
	ident_num: string;
}
