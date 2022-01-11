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
	identTypeId: number;
	identNum: string;
}
