export interface FlagInt {
	[key: string]: boolean;
}

export interface ObjString {
	[key: string]: string;
}

export interface errorFlagInt {
	email: boolean;
	password: FlagInt;
	identType: boolean;
	identNum: boolean;
}

export interface UserInt {
	email: string;
	password: string;
	identTypeId: number;
	identNum: string;
}

export interface ResErrorInt {
	type: string;
	message: string;
	code: string;
}

export interface UserLoginInt {
	email: string;
	password: string;
}
